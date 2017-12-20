package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Car struct {
	ID      bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Mark    string        `bson:"mark" json:"mark"`
	Model   string        `bson:"model" json:"model"`
	Mileage int           `bson:"mileage" json:"mileage"`
}

type CarAPI struct {
	Session *mgo.Session
}

func (ca CarAPI) GetCars(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	session := ca.Session.Copy()
	defer session.Close()

	carsCollection := session.DB("garage").C("cars")

	cars := make([]Car, 0)

	err := carsCollection.Find(nil).All(&cars)
	if err != nil {
		log.Fatal(err)
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(cars)
	if err != nil {
		log.Fatal(err)
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func (ca CarAPI) GetCar(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	if !bson.IsObjectIdHex(id) {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	session := ca.Session.Copy()
	defer session.Close()

	carsCollection := session.DB("garage").C("cars")

	var car = Car{}

	err := carsCollection.FindId(bson.ObjectIdHex(id)).One(&car)
	switch {
	case err == mgo.ErrNotFound:
		http.NotFound(w, r)
		return
	case err != nil:
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

func (ca CarAPI) CreateCar(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	car := Car{}
	if err := json.NewDecoder(r.Body).Decode(&car); err != nil {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	car.ID = bson.NewObjectId()

	session := ca.Session.Copy()
	defer session.Close()

	carsCollection := session.DB("garage").C("cars")

	err := carsCollection.Insert(car)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(map[string]bson.ObjectId{"id": car.ID})
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func (ca CarAPI) EditCar(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	if !bson.IsObjectIdHex(id) {
		http.Error(w, id, http.StatusBadRequest)
		return
	}

	car := Car{}
	if err := json.NewDecoder(r.Body).Decode(&car); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	session := ca.Session.Copy()
	defer session.Close()

	carsCollection := session.DB("garage").C("cars")

	err := carsCollection.UpdateId(bson.ObjectIdHex(id), bson.M{"$set": car})
	switch {
	case err == mgo.ErrNotFound:
		http.NotFound(w, r)
		return
	case err != nil:
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
