package api

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"html/template"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	t, err := template.ParseFiles("frontend/build/index.html")

	if err != nil {
		fmt.Fprint(w, err.Error())
	}

	t.Execute(w, nil)
}
