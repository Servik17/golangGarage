package query

// Cars
const Cars string = `SELECT * FROM car`
const Car string = `SELECT * FROM car WHERE id=$1`
const AddCar string = `INSERT INTO car (mark, model, mileage) VALUES ($1, $2, $3) RETURNING id`
const UpdateCar string = `UPDATE car SET (mark, model, mileage) = ($1, $2, $3) WHERE id=$4`

// Reapirs
const Repairs string = `SELECT * FROM repair INNER JOIN car USING (id)`
const Repair string = `SELECT * FROM repair INNER JOIN car USING (id) WHERE id=$1`
const SparePartsRepair string = `
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
`
