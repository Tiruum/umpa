package httpapi

import (
	"net/http"

	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
)

// RegisterRoutes регистрирует все пути (как app.use() или router.get() в Express).
// ServeMux в Go 1.22 умеет сразу парсить методы "POST /path".
func RegisterRoutes(mux *http.ServeMux, watchService *watch.Service) {
	mux.HandleFunc("GET /healthz", healthHandler)
	mux.HandleFunc("GET /swagger.yaml", swaggerSpecHandler)
	mux.HandleFunc("GET /docs", swaggerUIHandler)

	// REST API для работы с сущностью Watches 
	mux.HandleFunc("GET /api/watches", listWatchesHandler(watchService))
	mux.HandleFunc("POST /api/watches", createWatchHandler(watchService))
	mux.HandleFunc("GET /api/watches/{id}", getWatchHandler(watchService))
	mux.HandleFunc("PUT /api/watches/{id}", updateWatchHandler(watchService))
	mux.HandleFunc("DELETE /api/watches/{id}", deleteWatchHandler(watchService))
}
