package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/LH-10/mylistr/pkg/models"
	"github.com/LH-10/mylistr/pkg/roles"
	"github.com/LH-10/mylistr/pkg/utils"
	"github.com/golang-jwt/jwt/v5"
)

func AdminSignUp(w http.ResponseWriter, r *http.Request) {
	userdetails := struct {
		Name     string `json:"name"`
		Email    string `json:"useremail"`
		Password string `json:"password"`
	}{}
	err := utils.ParseJson(r, &userdetails)
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid Req body", http.StatusBadRequest)
		return
	}

	hashPassword := userdetails.Password
	utils.Hash(&hashPassword)
	var user = models.User{Name: userdetails.Name, Email: userdetails.Email, Password: hashPassword}
	user.SetAccessLevel(roles.ADMIN)
	id, err := user.InsertRecord()
	if err != nil {
		log.Println("Error", err)
		http.Error(w, "DB error", http.StatusInternalServerError)
		return
	}
	fmt.Println(id, "Added")
	fmt.Println(user)
	fmt.Fprintf(w, "Result:%v", id)
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := utils.ParseJson(r, user)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid Req body", http.StatusBadRequest)
	}

	err = user.CheckUserPassword()
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Incorrect Username or Password", http.StatusUnauthorized)
	}
	token := jwt.NewWithClaims(&jwt.SigningMethodECDSA{}, jwt.MapClaims{"token": user.ID})
	tokenString, err := token.SignedString(os.Getenv("JWT_SECRET"))
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error While Signing", http.StatusInternalServerError)

	}
	w.Header().Add("Authorization", "Bearer "+tokenString)
	w.Write([]byte("You Are authenticated"))
}
