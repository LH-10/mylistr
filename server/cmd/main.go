package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	_ "github.com/LH-10/mylistr/pkg/dbconfig"
	_ "github.com/LH-10/mylistr/pkg/models"
	"github.com/LH-10/mylistr/pkg/routes"
)

var (
	serverPort = flag.String("port", "8099", "define the port for server to listen on ")
)

func main() {
	flag.Parse()
	godotenv.Load(".env")

	router := chi.NewRouter()
	router.Use(middleware.Recoverer)
	router.Use(
		cors.Handler(cors.Options{
			AllowedOrigins: []string{"*"},
			AllowedMethods: []string{"GET", "POST", "PUT"},
			AllowedHeaders: []string{"*"},
		}),
	)
	router.Use(middleware.Logger)
	router.Get("/test", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Working"))
	}))
	routes.ResgisterAdminRoutes(router)
	addr := fmt.Sprintf("%s:%s", "localhost", *serverPort)
	fmt.Println("Listening on port :", *serverPort)
	log.Fatal(http.ListenAndServe(addr, router))

}
