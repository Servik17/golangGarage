package api

// import (
// 	"encoding/json"
// 	"github.com/julienschmidt/httprouter"
// 	"log"
// 	"net/http"
// 	"strconv"

// 	"../models"
// )

// func SparePartsHandler(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
// 	carID, err := strconv.Atoi(ps.ByName("carID"))
// 	if err != nil {
// 		http.Error(w, http.StatusText(400), http.StatusBadRequest)
// 		return
// 	}

// 	spareParts, err := models.GetSpareParts(carID)
// 	if err != nil {
// 		log.Fatal(err)
// 		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
// 	}

// 	response, err := json.Marshal(spareParts)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(response)
// }
