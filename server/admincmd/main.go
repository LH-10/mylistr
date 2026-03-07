package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	log.Println("Started")
	protocol := "http"
	addr := fmt.Sprintf("%s://%s", protocol, "localhost:8099")
	route := "/api/auth/admin/signup"
	addr += route
	fmt.Println("place")
	var useremail, name, password string

	fmt.Print("Enter Email:")
	fmt.Scanln(&useremail)
	fmt.Print("Enter Name:")
	fmt.Scanln(&name)
	fmt.Print("Enter Password:")
	fmt.Scanln(&password)

	jsonOb, err := json.Marshal(struct{ Name, Password, Useremail string }{Name: name, Password: password, Useremail: useremail})
	if err != nil {
		log.Println(err)
		return
	}
	body := bytes.NewReader(jsonOb)
	resp, err := http.Post(addr, "application/json", body)
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println(resp)
}
