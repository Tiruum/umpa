package httpapi

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
)

// createWatchHandler godoc
// @Summary Create watch
// @Tags watches
// @Accept json
// @Produce json
// @Param payload body watch.CreateWatchInput true "Create watch payload"
// @Success 201 {object} watch.Watch
// @Failure 400 {string} string
// @Failure 500 {string} string
// @Router /api/watches [post]
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

// listWatchesHandler godoc
// @Summary List watches
// @Tags watches
// @Produce json
// @Success 200 {array} watch.Watch
// @Failure 500 {string} string
// @Router /api/watches [get]
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

// getWatchHandler godoc
// @Summary Get watch by id
// @Tags watches
// @Produce json
// @Param id path int true "Watch ID"
// @Success 200 {object} watch.Watch
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /api/watches/{id} [get]
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

// updateWatchHandler godoc
// @Summary Update watch by id
// @Tags watches
// @Accept json
// @Produce json
// @Param id path int true "Watch ID"
// @Param payload body watch.UpdateWatchInput true "Update watch payload"
// @Success 200 {object} watch.Watch
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /api/watches/{id} [put]
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

// deleteWatchHandler godoc
// @Summary Delete watch by id
// @Tags watches
// @Param id path int true "Watch ID"
// @Success 204
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /api/watches/{id} [delete]
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
