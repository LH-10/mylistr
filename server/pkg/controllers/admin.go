package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/LH-10/mylistr/pkg/models"
	"github.com/LH-10/mylistr/pkg/utils"
)

func GameDetails(w http.ResponseWriter, r *http.Request) {
	id, ok := r.Context().Value("jwtSubUser").(int64)
	if !ok {
		fmt.Println("Err invalid user_id type in jwt")
		http.Error(w, "Error Processing thre request", http.StatusBadRequest)
	}

	var admin_user models.User
	admin_user.ID = id
	isadmin, err := admin_user.IsAdmin()
	if err != nil || !isadmin {
		http.Error(w, "access denied", http.StatusUnauthorized)
		return
	}

	var games = []models.GameDetail{}
	err = admin_user.GetGames(&games)
	if err != nil {
		log.Println("Err:", err)
		http.Error(w, "Error During DB operation", http.StatusBadRequest)
	}

	fmt.Fprintf(w, "%v", games)
}

func AddNewGame(w http.ResponseWriter, r *http.Request) {
	id, ok := r.Context().Value("jwtSubUser").(int64)
	if !ok {
		fmt.Println("Err invalid user_id type in jwt")
		http.Error(w, "Invalid user id", http.StatusBadRequest)
		return
	}
	var user models.User
	user.ID = id
	isadmin, err := user.IsAdmin()
	if err != nil || !isadmin {
		log.Println(err)
		http.Error(w, "access denied", http.StatusUnauthorized)
		return
	}

	var game_data models.GameDetail
	//parse json body
	err = utils.ParseJson(r, &game_data)
	gameid, err := game_data.InsertData()
	if err != nil {
		fmt.Println(err)
		http.Error(w, "DB error", http.StatusBadRequest)
		return
	}
	fmt.Println(gameid)
	// db.Query("Insert into recorded_by(admin_id,game_id) values(?,?)", id, gameid)
}

func EditGameDetails(w http.ResponseWriter, r *http.Request) {
	// id := jwtVerify(token)
	// var game_data models.GameData = r.Body.Parse
	// gameid = game_data.UpdateData()

}
