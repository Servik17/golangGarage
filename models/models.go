package models

import "database/sql"

func getIdFromRow(r *sql.Row) (int, error) {
	var id int

	err := r.Scan(id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

type RepairSparePart struct {
	ID           int       `json:"id"`
	AmountType   uint8     `json:"amountType"`
	Amount       uint8     `json:"amount"`
	Price        float64   `json:"price"`
	ResourceType uint8     `json:"resourceType"`
	Resource     int       `json:"resource"`
	SparePart    SparePart `json:"sparePart"`
}
