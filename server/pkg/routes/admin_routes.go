package routes

import (
	"github.com/LH-10/mylistr/pkg/controllers"
	"github.com/LH-10/mylistr/pkg/middlewares"
	"github.com/go-chi/chi/v5"
)

func ResgisterAdminRoutes(r chi.Router) {
	r.Route("/api/admin", func(r chi.Router) {
		r.Use(middlewares.Authenticate)
		r.Get("/gamerecords", controllers.GameDetails)
		r.Post("/addgame", controllers.AddNewGame)
	})
}
