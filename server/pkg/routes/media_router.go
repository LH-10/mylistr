package routes

import (
	"net/http"
	"path"

	"github.com/LH-10/mylistr/pkg/directories"
	"github.com/go-chi/chi/v5"
)

func ResgisterMediaRoute(r chi.Router) {
	var mediaRoute string = directories.UsrGameImagePath()
	var fileDir string = path.Join(directories.FSGameImagePath())
	r.Handle(mediaRoute, http.StripPrefix(mediaRoute, http.FileServer(http.Dir(fileDir))))
}
