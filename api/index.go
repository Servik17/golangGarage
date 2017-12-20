package api

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func IndexHandler(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	t, err := template.ParseFiles("frontend/build/index.html")

	if err != nil {
		fmt.Fprint(w, err.Error())
	}

	t.Execute(w, nil)
}
