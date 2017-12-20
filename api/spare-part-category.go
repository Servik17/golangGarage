package api

// import (
// 	"../models"
// 	"encoding/json"
// 	"github.com/julienschmidt/httprouter"
// 	"log"
// 	"net/http"
// )

// func SparePartCategoriesHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
// 	sparePartCategories, err := models.GetSparePartCategories()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	response, err := json.Marshal(sparePartCategories)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(response)
// }

// func SparePartCategoryAddHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
// 	decoder := json.NewDecoder(r.Body)

// 	sparePartCategory := models.SparePartCategory{}

// 	err := decoder.Decode(&sparePartCategory)
// 	if err != nil {
// 		http.Error(w, http.StatusText(400), http.StatusBadRequest)
// 	}
// 	defer r.Body.Close()

// 	sparePartCategory.ID, err = models.AddSparePartCategory(&sparePartCategory)
// 	if err != nil {
// 		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
// 		return
// 	}

// 	response, err := json.Marshal(map[string]int{"id": sparePartCategory.ID})
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(response)
// }
