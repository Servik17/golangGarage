package migrations

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

func Migrate() {
	var table *sql.Rows
	var err error
	var db *sql.DB

	fmt.Println("migrate")
	defer fmt.Println("end migrate")

	db, err = sql.Open("postgres", "user=garage password=garage dbname=garage sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	table, err = db.Query(`
		CREATE TABLE car (
			id SERIAL PRIMARY KEY,
			mark VARCHAR (50) NOT NULL ,
			model VARCHAR (50) NOT NULL,
			mileage INTEGER DEFAULT 0
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()

	table, err = db.Query(`
		CREATE TABLE spare_part_category (
			id SERIAL PRIMARY KEY,
			name VARCHAR (50) NOT NULL
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()

	table, err = db.Query(`
		CREATE TABLE spare_part (
			id SERIAL PRIMARY KEY,
			name VARCHAR(50),
			vendor_code VARCHAR(50),
			category_id INT REFERENCES spare_part_category,
			price NUMERIC (9, 2),
			resource_type SMALLINT,
			resource INT,
			car_id INT REFERENCES car,
			description VARCHAR(200)
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()

	table, err = db.Query(`
		CREATE TABLE repair_spare_part (
			id SERIAL PRIMARY KEY,
			spare_part_id INT REFERENCES spare_part,
			amount SMALLINT,
			amount_type SMALLINT
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()

	table, err = db.Query(`
		CREATE TABLE repair (
			id SERIAL PRIMARY KEY,
			date DATE NOT NULL,
			car_id INTEGER REFERENCES car
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()

	table, err = db.Query(`
		CREATE TABLE spare_part_repair (
			repair_id INTEGER,
			repair_spare_part_id INTEGER,
			PRIMARY KEY (repair_id, repair_spare_part_id)
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
	table.Close()
}
