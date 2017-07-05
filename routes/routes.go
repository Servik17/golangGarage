package routes

import (
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"net/http"

	"../api"
)

func InitRoutes() http.Handler {
	r := httprouter.New()

	r.GET("/", api.IndexHandler)
	r.GET("/api/v0/cars", api.CarsHandler)
	r.GET("/api/v0/cars/:id", api.CarHandler)
	//r.POST("/api/v0/cars/add", api.CarAddHandler)
	r.POST("/api/v0/cars/:id/update", api.CarUpdateHandler)
	r.GET("/api/v0/repairs", api.RepairsHandler)
	r.GET("/api/v0/repairs/:id", api.RepairsHandler)

	r.NotFound = http.StripPrefix("/static/", http.FileServer(http.Dir("./frontend/build/static/")))

	handler := cors.Default().Handler(r)

	return handler
}
