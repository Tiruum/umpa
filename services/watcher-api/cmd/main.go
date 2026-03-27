package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Tiruum/umpa/services/watcher-api/internal/httpapi"
	"github.com/Tiruum/umpa/services/watcher-api/internal/storage/sqlite"
	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
)

func main() {
	// Создаем логгер в JSON формате.
	// Это удобнее для продакшена: логи легко парсить в Grafana/Loki/ELK.
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8001"
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./watcher.db"
	}

	// Сборка зависимостей (Dependency Injection):
	// 1) Репозиторий в SQLite
	// 2) Сервис с бизнес-логикой, который работает через интерфейс репозитория
	repo, err := sqlite.NewWatchRepository(dbPath)
	if err != nil {
		slog.Error("failed to initialize sqlite repository", "error", err, "db_path", dbPath)
		os.Exit(1)
	}
	defer func() {
		if closeErr := repo.Close(); closeErr != nil {
			slog.Error("failed to close sqlite connection", "error", closeErr)
		}
	}()

	service := watch.NewService(repo)

	// Создаем роутер и регистрируем все HTTP маршруты.
	mux := http.NewServeMux()
	httpapi.RegisterRoutes(mux, service)

	// Конфигурируем HTTP сервер.
	// Addr должен быть в формате ":8080".
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	// Канал для сигналов ОС (Ctrl+C, остановка контейнера и т.д.).
	// Буфер 1 означает: один сигнал можно положить в канал, даже если пока никто не читает.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Запускаем сервер в отдельной горутине, чтобы main мог параллельно ждать сигнал завершения.
	go func() {
		slog.Info("watcher-api is starting", "port", port)

		// ListenAndServe блокирующий: пока сервер работает, эта функция "висит".
		// Нормальное завершение сервера возвращает http.ErrServerClosed — это не ошибка.
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			slog.Error("server failed", "error", err)
			os.Exit(1)
		}
	}()

	// Блокируемся здесь и ждем сигнал завершения.
	<-quit
	slog.Info("shutting down server")

	// Даем серверу до 5 секунд на graceful shutdown:
	// новые запросы не принимаются, активные запросы пытаются завершиться корректно.
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		slog.Error("server forced to shutdown", "error", err)
	}

	slog.Info("server exited cleanly")
}
