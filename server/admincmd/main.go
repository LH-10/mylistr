package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func SignIn(addr, content_type string, reqBody io.Reader) (resp *http.Response, err error) {
	route := "/api/auth/admin/signin"
	addr += route

	resp, err = http.Post(addr, content_type, reqBody)
	if err != nil {
		log.Panicln(err)
		return
	}
	return
}

func reqBody() (io.Reader, error) {
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
		return nil, err
	}
	body := bytes.NewReader(jsonOb)
	return body, nil
}

func SignUp(addr, content_type string, reqBody io.Reader) (resp *http.Response, err error) {
	route := "/api/auth/admin/signup"
	addr += route

	resp, err = http.Post(addr, content_type, reqBody)
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func main() {
	log.Println("Started")
	protocol := "http"
	addr := fmt.Sprintf("%s://%s", protocol, "localhost:8099")
	fmt.Println("place")

	body, err := reqBody()
	if err != nil {
		return
	}
	fmt.Print("Enter 1 to signin , Enter 2 to signup\nEnter Your Choice:")
	var choice int8
	fmt.Scan(&choice)
	var resp *http.Response
	switch choice {
	case 2:
		resp, err = SignUp(addr, "application/json", body)
		if err != nil {
			return
		}
	case 1:
		resp, err = SignIn(addr, "application/json", body)
		if err != nil {
			return
		}
	}
	hd := resp.Header
	fmt.Println(hd)

	var respBodyJson map[string]any
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("body read", err)
		return
	}
	json.Unmarshal(respBody, &respBodyJson)
	fmt.Println("\n", respBodyJson)
	fmt.Println(resp)
}
