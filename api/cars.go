package api

import (
	"database/sql"
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"

	"../models"
)

func CarsHandler(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	cars, err := models.GetCars()
	if err != nil {
		log.Fatal(err)
	}

	response, err := json.Marshal(cars)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func CarHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	if id == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	car, err := models.GetCar(id)
	switch {
	case err == sql.ErrNoRows:
		http.NotFound(w, r)
		return
	case err != nil:
		log.Fatal(err)
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(car)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func CarAddHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	decoder := json.NewDecoder(r.Body)

	car := models.Car{}

	err := decoder.Decode(&car)
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
	}
	defer r.Body.Close()

	id, err := models.AddCar(&car)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(map[string]int{"id": id})
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func CarUpdateHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	carId := ps.ByName("id")
	if carId == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)

	car := models.Car{}

	err := decoder.Decode(&car)
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
	}
	defer r.Body.Close()

	err = models.UpdateCar(&car, carId)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}
