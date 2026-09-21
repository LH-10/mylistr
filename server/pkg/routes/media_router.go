package routes

import (
	"fmt"
	"net/http"

	"github.com/LH-10/mylistr/pkg/directories"
	"github.com/go-chi/chi/v5"
)

func ResgisterMediaRoute(r chi.Router) {
	var mediaRoute string = directories.UsrGameImagePath()
	var fileDir string = directories.FSGameImagePath()
	fmt.Println("Routes", mediaRoute, "\n ", fileDir)
	r.Handle(mediaRoute+"/{files}", http.StripPrefix(mediaRoute, http.FileServer(http.Dir(fileDir))))
}
