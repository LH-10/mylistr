package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func ResgisterMediaRoute(r chi.Router) {
	const mediaRoute string = "/media/game/images"
	const fileDir string = "/files/game"
	r.Handle(mediaRoute, http.StripPrefix(mediaRoute, http.FileServer(http.Dir(fileDir))))
}
