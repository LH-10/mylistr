package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

func makeResponseJson(w http.ResponseWriter, reply any) {
	bin, err := json.Marshal(reply)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error while forming the response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(bin)
	if err != nil {
		log.Println(err)
	}
}
