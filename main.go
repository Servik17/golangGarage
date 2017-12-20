package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"

	"./api"
)

func main() {

	session, err := mgo.Dial("mongodb://localhost")
	if err != nil {
		panic(err)
	}
	defer session.Close()

	carAPI := api.CarAPI{session}

	r := httprouter.New()

	r.GET("/", api.IndexHandler)
	r.GET("/api/v0/cars", carAPI.GetCars)
	r.POST("/api/v0/cars/:id/edit", carAPI.EditCar)
	r.GET("/api/v0/cars/:id", carAPI.GetCar)
	r.POST("/api/v0/car/create", carAPI.CreateCar)
	// r.GET("/api/v0/repair/:id", api.RepairsHandler(session))
	// r.GET("/api/v0/repairs", api.RepairsHandler(session))
	// r.GET("/api/v0/spare-part-categories", api.SparePartCategoriesHandler(session))
	// r.GET("/api/v0/spare-parts/:carID", api.SparePartsHandler(session))

	r.NotFound = http.FileServer(http.Dir("./frontend/build/"))

	http.ListenAndServe(":8000", r)
}
