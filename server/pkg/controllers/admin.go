package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"path"

	"github.com/LH-10/mylistr/pkg/directories"
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
	jsob, err := json.Marshal(games)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "wrong while fetching", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-type", "application/json")
	w.Write(jsob)
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
	err = r.ParseMultipartForm(10 * (1024 * 1024))
	if err != nil {
		log.Println(err)
		return
	}
	if r.MultipartForm != nil {
		defer r.MultipartForm.RemoveAll()
	}
	file, file_header, err := r.FormFile("banner")
	if err != nil {
		log.Println(err)
		return
	}
	filePath := path.Join(".", directories.Root, directories.Images, directories.GameDir, file_header.Filename)
	fmt.Println("filepath", filePath)
	go func() {
		err = utils.SaveFile(file, filePath)
		if err != nil {
			fmt.Println("file save failed", filePath)
		}
	}()
	err = utils.ParseJsonString(r.FormValue("game_details"), &game_data)
	fmt.Println(game_data)
	game_data.HeaderImage = filePath
	gameid, err := game_data.InsertData(user.ID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "DB error", http.StatusBadRequest)
		return
	}
	fmt.Println(gameid)
	jsonObj, err := json.Marshal(struct {
		Result string
		Gameid int
	}{Result: "success", Gameid: int(gameid)})
	if err != nil {
		http.Error(w, "Error while responding", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonObj)
	if err != nil {
		http.Error(w, "Error while responding", http.StatusInternalServerError)
	}
}

func EditGameDetails(w http.ResponseWriter, r *http.Request) {
	// id := jwtVerify(token)
	// var game_data models.GameData = r.Body.Parse
	// gameid = game_data.UpdateData()

}
