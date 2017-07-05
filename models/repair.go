package models

import "time"

type Repair struct {
	Id               int               `json:"id"`
	Date             time.Time         `json:"date"`
	Car              Car               `json:"car"`
	RepairSpareParts []RepairSparePart `json:"repairSpareParts"`
}

func GetRepairs() ([]Repair, error) {
	rs, err := garageDB.Query(`SELECT * FROM repair INNER JOIN car USING (id);`)
	if err != nil {
		return nil, err
	}
	defer rs.Close()

	sp, err := garageDB.Query(`
		SELECT repair_spare_part.id,
			   repair_spare_part.amount_type,
			   repair_spare_part.amount,
			   spare_part.id,
			   spare_part.name,
			   spare_part.vendor_code,
			   spare_part.price,
			   spare_part.resource_type,
			   spare_part.resource,
			   spare_part.description,
			   spare_part_category.id,
			   spare_part_category.name
		FROM spare_part_repair
		INNER JOIN repair ON repair_id = repair.id
		INNER JOIN repair_spare_part ON repair_spare_part_id = repair_spare_part.id
		INNER JOIN spare_part ON spare_part_id = spare_part.id
		INNER JOIN spare_part_category ON category_id = spare_part_category.id;
	`)
	if err != nil {
		return nil, err
	}
	defer sp.Close()

	repairs := make([]Repair, 0)

	for rs.Next() {
		r := Repair{}

		err := rs.Scan(
			&r.Id,
			&r.Date,
			&r.Car.Id,
			&r.Car.Mark,
			&r.Car.Model,
			&r.Car.Mileage,
		)
		if err != nil {
			return nil, err
		}

		repairSpareParts := make([]RepairSparePart, 0)

		for sp.Next() {
			rsp := RepairSparePart{}

			err := sp.Scan(
				&rsp.Id,
				&rsp.AmountType,
				&rsp.Amount,
				&rsp.SparePart.Id,
				&rsp.SparePart.Name,
				&rsp.SparePart.VendorCode,
				&rsp.SparePart.Price,
				&rsp.SparePart.ResourceType,
				&rsp.SparePart.Resource,
				&rsp.SparePart.Description,
				&rsp.SparePart.Category.Id,
				&rsp.SparePart.Category.Name,
			)
			if err != nil {
				return nil, err
			}

			repairSpareParts = append(repairSpareParts, rsp)
		}

		r.RepairSpareParts = repairSpareParts

		repairs = append(repairs, r)
	}

	return repairs, nil
}

func GetRepair(id string) (*Repair, error) {
	row := garageDB.QueryRow(`SELECT * FROM repair WHERE id=$1 INNER JOIN car USING (id) WHERE;`, id)

	sp, err := garageDB.Query(`
		SELECT repair_spare_part.id,
			   repair_spare_part.amount_type,
			   repair_spare_part.amount,
			   spare_part.id,
			   spare_part.name,
			   spare_part.vendor_code,
			   spare_part.price,
			   spare_part.resource_type,
			   spare_part.resource,
			   spare_part.description,
			   spare_part_category.id,
			   spare_part_category.name
		FROM spare_part_repair
		INNER JOIN repair ON repair_id = repair.id
		INNER JOIN repair_spare_part ON repair_spare_part_id = repair_spare_part.id
		INNER JOIN spare_part ON spare_part_id = spare_part.id
		INNER JOIN spare_part_category ON category_id = spare_part_category.id
		WHERE repair_id=$1;
	`, id)
	if err != nil {
		return nil, err
	}
	defer sp.Close()

	r := Repair{}

	err = row.Scan(
		&r.Id,
		&r.Date,
		&r.Car.Id,
		&r.Car.Mark,
		&r.Car.Model,
		&r.Car.Mileage,
	)
	if err != nil {
		return nil, err
	}

	repairSpareParts := make([]RepairSparePart, 0)

	for sp.Next() {
		rsp := RepairSparePart{}

		err := sp.Scan(
			&rsp.Id,
			&rsp.AmountType,
			&rsp.Amount,
			&rsp.SparePart.Id,
			&rsp.SparePart.Name,
			&rsp.SparePart.VendorCode,
			&rsp.SparePart.Price,
			&rsp.SparePart.ResourceType,
			&rsp.SparePart.Resource,
			&rsp.SparePart.Description,
			&rsp.SparePart.Category.Id,
			&rsp.SparePart.Category.Name,
		)
		if err != nil {
			return nil, err
		}

		repairSpareParts = append(repairSpareParts, rsp)
	}

	r.RepairSpareParts = repairSpareParts

	return &r, nil
}
