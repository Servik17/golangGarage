package models

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

type GarageDB struct {
	*sql.DB
}

var garageDB *GarageDB

func InitDbConnection() {
	db, err := sql.Open("postgres", "user=garage password=garage dbname=garage sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	garageDB = &GarageDB{db}
}
