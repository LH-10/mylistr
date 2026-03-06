package models

import (
	"fmt"
	"log"

	"github.com/LH-10/mylistr/pkg/roles"
)

type User struct {
	ID           int64  `db:"id"`
	Name         string `db:"name"`
	access_level int16  `db:"access_level"`
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
		access_level smallint,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);

	`

const adminTrackSchema = `
	Create TABLE IF NOT EXISTS  adminTracker(
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	admin_id  BIGINT REFERENCES(users.id),
	game_id BIGINT REFERENCES(game_details.game_id),
	updated TIMESTAMPTZ NOT NULL,
	FOREIGN KEY admin_id,
	FOREIGN KEY game_id
	)
`

func (usr *User) IsAdmin() (bool, error) {
	err := db.Get(usr, `SELECT access_level from users where id=:id`, usr)
	if err != nil {
		return false, err
	}
	return usr.access_level == roles.ADMIN, nil
}

func (admin *User) GetGames(games *[]GameDetail) error {
	rows, err := db.NamedQuery("Select * from game_details JOIN game_details.game_id = recorded_by.game_id JOIN recorded_by.admin_id=users.admin_id WHERE users.id=:id ", admin)
	if err != nil {
		log.Println(err)
		return err
	}
	defer rows.Close()
	var game GameDetail
	for rows.Next() {

		rows.Scan(&game)
		*games = append(*games, game)
	}
	return nil
}
