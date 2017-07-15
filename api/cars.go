package api

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"

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
	carID, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	car, err := models.GetCar(carID)
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

	car.ID, err = models.AddCar(&car)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(map[string]int{"id": car.ID})
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func CarUpdateHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	carID, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)

	car := models.Car{}

	err = decoder.Decode(&car)
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
	}
	defer r.Body.Close()

	err = models.UpdateCar(&car, carID)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}
