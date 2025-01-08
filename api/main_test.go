package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPingRoute(t *testing.T) {
	router := setupRouter()
	router = ping(router)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/v1/", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, `{"message":"API is working"}`, w.Body.String())
}
