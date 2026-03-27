package httpapi

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
)

func createWatchHandler(service *watch.Service) http.HandlerFunc {
	// (w - это res/response, r - это req/request)
	return func(w http.ResponseWriter, r *http.Request) {
		var input watch.CreateWatchInput

		// Пытаемся распарсить JSON из тела запроса
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "invalid json body", http.StatusBadRequest)
			return
		}

		if input.URL == "" {
			http.Error(w, "url is required", http.StatusBadRequest)
			return
		}

		created, err := service.Create(r.Context(), input)
		if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated) // HTTP 201 Created
		_ = json.NewEncoder(w).Encode(created)
	}
}

func listWatchesHandler(service *watch.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		watches, err := service.List(r.Context())
		if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(watches)
	}
}

func getWatchHandler(service *watch.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		wtch, err := service.GetByID(r.Context(), id)
		if errors.Is(err, watch.ErrNotFound) {
			http.Error(w, "watch not found", http.StatusNotFound)
			return
		} else if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(wtch)
	}
}

func updateWatchHandler(service *watch.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		var input watch.UpdateWatchInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "invalid json body", http.StatusBadRequest)
			return
		}

		wtch, err := service.Update(r.Context(), id, input)
		if errors.Is(err, watch.ErrNotFound) {
			http.Error(w, "watch not found", http.StatusNotFound)
			return
		} else if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(wtch)
	}
}

func deleteWatchHandler(service *watch.Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		err = service.Delete(r.Context(), id)
		if errors.Is(err, watch.ErrNotFound) {
			http.Error(w, "watch not found", http.StatusNotFound)
			return
		} else if err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		// HTTP 204 No Content - удалено успешно, тела ответа нет.
		w.WriteHeader(http.StatusNoContent)
	}
}
