package routes

import (
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"net/http"

	"../api"
)

func path(p string) string {
	baseApiPath := "/api/v0"
	return baseApiPath + p
}

func InitRoutes() http.Handler {
	r := httprouter.New()

	r.GET("/", api.IndexHandler)
	r.GET(path("/cars"), api.CarsHandler)
	r.GET(path("/cars/:id"), api.CarHandler)
	//r.POST("/api/v0/cars/add", api.CarAddHandler)
	r.POST(path("/cars/:id/update"), api.CarUpdateHandler)
	r.GET(path("/repairs"), api.RepairsHandler)
	r.GET(path("/repairs/:id"), api.RepairsHandler)
	r.GET(path("/spare-part-categories"), api.SparePartCategoriesHandler)
	r.GET(path("/spare-parts/:carID"), api.SparePartsHandler)

	r.NotFound = http.StripPrefix("/static/", http.FileServer(http.Dir("./frontend/build/static/")))

	handler := cors.Default().Handler(r)

	return handler
}
