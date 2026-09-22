package models

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/LH-10/mylistr/pkg/directories"
	"github.com/LH-10/mylistr/pkg/roles"
	"github.com/LH-10/mylistr/pkg/utils"
)

type User struct {
	ID           int64  `db:"id"`
	Name         string `db:"name" json:"name"`
	Email        string `json:"useremail,omitempty"`
	Password     string `json:"password"`
	access_level int16  `db:"access_level"`
}

func (usr *User) SetAccessLevel(access_level int16) {
	usr.access_level = access_level
}

func (usr *User) CheckUserPassword() error {
	stmt, err := db.PrepareNamed("Select * from users where email=:email")
	if err != nil {
		return err
	}
	var temp struct {
		User
		CreatedAt   time.Time `db:"created_at"`
		AccessLevel int16     `db:"access_level"`
	}
	var stringpass = usr.Password
	if err = stmt.Get(&temp, usr); err != nil {
		return err
	}
	*usr = temp.User
	usr.access_level = temp.AccessLevel
	match := utils.CompareHash(stringpass, usr.Password)
	if !match {
		return fmt.Errorf("Incorrect Creds")
	}
	return nil
}

func (usr *User) InsertRecord() (int64, error) {
	stmt, err := db.Prepare(`INSERT INTO users(name, email, password, access_level) VALUES ($1,$2,$3,$4) RETURNING id`)
	if err != nil {
		fmt.Println("here")
		return -1, err
	}
	err = stmt.QueryRow(usr.Name, usr.Email, usr.Password, usr.access_level).Scan(&(usr.ID))
	if err != nil {
		return -1, err
	}

	return usr.ID, nil
}

func (usr *User) AddNewGame() error {
	if usr.access_level != roles.ADMIN {
		return fmt.Errorf("User not admin")
	}
	return nil
}

const userSchema = `
	CREATE TABLE IF NOT EXISTS users (
		id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name VARCHAR(255),
		email VARCHAR(255) UNIQUE,
		password VARCHAR(255) ,
		access_level smallint,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);

	`

const adminTrackSchema = `
	Create TABLE IF NOT EXISTS  admin_tracker (
	id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admin_id BIGINT REFERENCES users(id),
    game_id  BIGINT REFERENCES game_details(game_id),
    updated  TIMESTAMPTZ NOT NULL DEFAULT NOW()
	);
`

func init() {
	InitUserSchema()
}
func InitUserSchema() {
	db.MustExec(userSchema)
	db.MustExec(adminTrackSchema)
}

func (usr *User) IsAdmin() (bool, error) {
	stmt, err := db.PrepareNamed(`SELECT access_level from users where id=:id`)
	acc_lvl := struct {
		Access_lvl int16 `db:"access_level"`
	}{}
	stmt.Get(&acc_lvl, *usr)
	usr.access_level = acc_lvl.Access_lvl
	if err != nil {
		return false, err
	}
	return usr.access_level == roles.ADMIN, nil
}

func (admin *User) GetGames(games *[]GameDetail) error {
	rows, err := db.NamedQuery(`Select gdts.game_id as game_id , gdts.game_name as game_name , 
								gdts.release_date as release_date ,gdts.header_image as header_image, gdts.rating as rating , gdts.developer as developer,
								gdts.publisher as publisher ,  gdts.description as description , 
								gdts.tags as tags from game_details AS gdts JOIN admin_tracker AS atr ON gdts.game_id = atr.game_id 
								JOIN users  ON atr.admin_id=users.id WHERE users.id=:id `, admin)
	if err != nil {
		log.Println(err)
		return err
	}
	defer rows.Close()
	var game GameDetail
	for rows.Next() {
		rows.StructScan(&game)
		// rows.Scan(&game)

		fmt.Println("Header", game.HeaderImage)
		game.HeaderImage = strings.Replace(game.HeaderImage, directories.FSGameImagePath(), directories.UsrGameImagePath(), 1)
		fmt.Println(game)
		*games = append(*games, game)
	}
	return nil
}
