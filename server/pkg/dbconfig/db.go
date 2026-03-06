package dbconfig

import (
	"github.com/jmoiron/sqlx"
	"log"
	"fmt"
	_"github.com/lib/pq"

)

var db *sqlx.DB

func init(){
	var err error
	db,err=db_connect()
	if err!=nil{
		log.Fatal("db err:",err)
	}
	fmt.Println("Database Connected")

}

func db_connect()(*sqlx.DB,error){
	fmt.Println("Connecting to Database")
	db,err:=sqlx.Connect("postgres","host=localhost port=5442 user=root password=pass123 dbname=listdb sslmode=disable")
	if err!=nil{
		return nil,err
	}
	return db,nil
}

func GetDB() *sqlx.DB{
	return db
}