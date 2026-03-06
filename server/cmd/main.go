package main

import (
	"fmt"
	"log"
	"net/http"
	"flag"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	_"github.com/LH-10/mylistr/pkg/models"
	_"github.com/LH-10/mylistr/pkg/dbconfig"
)
var(
	serverPort=flag.String("port","8099","define the port for server to listen on ")
) 	


func main(){
	flag.Parse()
	router:=chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Get("/test",http.HandlerFunc(func (w http.ResponseWriter,r *http.Request){
		w.Write([]byte("Working"))
	}))

	addr:=fmt.Sprintf("%s:%s","localhost",*serverPort)
	fmt.Println("Listening on port :",*serverPort)	
	log.Fatal(http.ListenAndServe(addr,router))

}