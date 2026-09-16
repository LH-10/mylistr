package main

import (
	"github.com/LH-10/mylistr/pkg/routes"
	"github.com/go-chi/chi/v5"
)

func mediaHandler(r chi.Router) {
	routes.ResgisterMediaRoute(r)
}
