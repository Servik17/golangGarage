package routes

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"

	"../api"
)

func InitRoutes() http.Handler {
	r := httprouter.New()

	r.GET("/", api.IndexHandler)
	r.GET("/api/v0/cars", api.CarsHandler)
	r.POST("/api/v0/cars/create", api.CarCreateHandler)
	r.POST("/api/v0/car/:id/edit", api.CarUpdateHandler)
	r.GET("/api/v0/car/:id", api.CarHandler)
	r.GET("/api/v0/repair/:id", api.RepairsHandler)
	r.GET("/api/v0/repairs", api.RepairsHandler)
	r.GET("/api/v0/spare-part-categories", api.SparePartCategoriesHandler)
	r.GET("/api/v0/spare-parts/:carID", api.SparePartsHandler)

	r.NotFound = http.FileServer(http.Dir("./frontend/build/"))

	handler := cors.Default().Handler(r)

	return handler
}
