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
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Сериализуем объект прямо в трубу ответа
	_ = json.NewEncoder(w).Encode(healthResponse{
		Status: "ok",
	})
}
