package main

import (
	"net/http"

	"./models"
	"./routes"
)

func main() {
	models.InitDbConnection()

	http.ListenAndServe(":8000", routes.InitRoutes())
}
