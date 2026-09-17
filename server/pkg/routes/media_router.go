package routes

import (
	"net/http"
	"path"

	"github.com/LH-10/mylistr/pkg/directories"
	"github.com/go-chi/chi/v5"
)

func ResgisterMediaRoute(r chi.Router) {
	const mediaRoute string = "/media/game/images"
	var fileDir string = path.Join(".", directories.Root, directories.Images, directories.GameDir)
	r.Handle(mediaRoute, http.StripPrefix(mediaRoute, http.FileServer(http.Dir(fileDir))))
}
