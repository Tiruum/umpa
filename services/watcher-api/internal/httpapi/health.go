package httpapi

import (
	"encoding/json"
	"net/http"
)

// healthResponse - структура для ответа ручки проверки здоровья сервера
type healthResponse struct {
	Status string `json:"status"`
}

// healthHandler - эндпоинт для оркестраторов (Kubernetes / Docker) "я всё еще жив?"
// @Summary Health check
// @Tags health
// @Produce json
// @Success 200 {object} healthResponse
// @Router /healthz [get]
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Сериализуем объект прямо в трубу ответа
	_ = json.NewEncoder(w).Encode(healthResponse{
		Status: "ok",
	})
}
