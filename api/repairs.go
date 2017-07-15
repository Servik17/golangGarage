package api

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"

	"../models"
	"database/sql"
	"strconv"
)

func RepairsHandler(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	repairs, err := models.GetRepairs()
	if err != nil {
		log.Fatal(err)
	}

	response, err := json.Marshal(repairs)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func RepairHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	repair, err := models.GetRepair(id)
	switch {
	case err == sql.ErrNoRows:
		http.NotFound(w, r)
		return
	case err != nil:
		log.Fatal(err)
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(repair)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}
