package models

import (
	"time"

	"./query"
)

type Repair struct {
	ID               int               `json:"id"`
	Date             time.Time         `json:"date"`
	Car              Car               `json:"car"`
	RepairSpareParts []RepairSparePart `json:"repairSpareParts"`
}

func GetRepairs() ([]Repair, error) {
	rs, err := garageDB.Query(query.Repairs)
	if err != nil {
		return nil, err
	}
	defer rs.Close()

	sp, err := garageDB.Query(query.SparePartsRepair)
	if err != nil {
		return nil, err
	}
	defer sp.Close()

	repairs := make([]Repair, 0)

	for rs.Next() {
		repair := Repair{}

		err := rs.Scan(
			&repair.ID,
			&repair.Date,
			&repair.Car.ID,
			&repair.Car.Mark,
			&repair.Car.Model,
			&repair.Car.Mileage,
		)
		if err != nil {
			return nil, err
		}

		repairSpareParts := make([]RepairSparePart, 0)

		for sp.Next() {
			rsp := RepairSparePart{}

			err := sp.Scan(
				&rsp.ID,
				&rsp.AmountType,
				&rsp.Amount,
				&rsp.Price,
				&rsp.ResourceType,
				&rsp.Resource,
				&rsp.SparePart.ID,
				&rsp.SparePart.Name,
				&rsp.SparePart.VendorCode,
				&rsp.SparePart.Description,
				&rsp.SparePart.Category.ID,
				&rsp.SparePart.Category.Name,
			)
			if err != nil {
				return nil, err
			}

			repairSpareParts = append(repairSpareParts, rsp)
		}

		repair.RepairSpareParts = repairSpareParts

		repairs = append(repairs, repair)
	}

	return repairs, nil
}

func GetRepair(id int) (*Repair, error) {
	row := garageDB.QueryRow(query.Repair, id)

	sp, err := garageDB.Query(query.SparePartsRepair, id)
	if err != nil {
		return nil, err
	}
	defer sp.Close()

	repair := Repair{}

	err = row.Scan(
		&repair.ID,
		&repair.Date,
		&repair.Car.ID,
		&repair.Car.Mark,
		&repair.Car.Model,
		&repair.Car.Mileage,
	)
	if err != nil {
		return nil, err
	}

	repairSpareParts := make([]RepairSparePart, 0)

	for sp.Next() {
		rsp := RepairSparePart{}

		err := sp.Scan(
			&rsp.ID,
			&rsp.AmountType,
			&rsp.Amount,
			&rsp.Price,
			&rsp.ResourceType,
			&rsp.Resource,
			&rsp.SparePart.ID,
			&rsp.SparePart.Name,
			&rsp.SparePart.VendorCode,
			&rsp.SparePart.Description,
			&rsp.SparePart.Category.ID,
			&rsp.SparePart.Category.Name,
		)
		if err != nil {
			return nil, err
		}

		repairSpareParts = append(repairSpareParts, rsp)
	}

	repair.RepairSpareParts = repairSpareParts

	return &repair, nil
}

//func AddRepair() (int, error) {
//
//}
