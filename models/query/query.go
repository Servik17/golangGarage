package query

// Reapirs
const Repairs string = `SELECT * FROM repair INNER JOIN car USING (id)`
const Repair string = `SELECT * FROM repair INNER JOIN car USING (id) WHERE id=$1`
const SparePartsRepair string = `
	SELECT repair_spare_part.id,
		   repair_spare_part.amount_type,
		   repair_spare_part.amount,
		   repair_spare_part.price,
		   repair_spare_part.resource_type,
		   repair_spare_part.resource,
		   spare_part.id,
		   spare_part.name,
		   spare_part.vendor_code,
		   spare_part.description,
		   spare_part_category.id,
		   spare_part_category.name
	FROM spare_part_repair
	INNER JOIN repair ON repair_id = repair.id
	INNER JOIN repair_spare_part ON repair_spare_part_id = repair_spare_part.id
	INNER JOIN spare_part ON spare_part_id = spare_part.id
	INNER JOIN spare_part_category ON category_id = spare_part_category.id
`
const AddRepair string = `
	INSERT INTO repair
		(date, car_id)
	VALUES ($1, $2)
	RETURNING id
`

// RepairSparePart

const AddRepairSparePart string = `
	INSERT INTO repair_spare_part
		(spare_part_id, amount_type, amount)
	VALUES ($1, $2, $3)
	RETURNING id
`
const AddSparePartRepair string = `
	INSERT INTO spare_part_repair
		(repair_id, repair_spare_part_id)
	VALUES ($1, $2)
`

//SparePart
const SpareParts string = `
	SELECT spare_part.id,
	       spare_part.name,
	       spare_part.vendor_code,
	       spare_part.price,
	       spare_part.resource_type,
	       spare_part.resource,
	       spare_part.description,
	       spare_part_category.id,
	       spare_part_category.name,
	       car.id,
	       car.mark,
	       car.model,
	       car.mileage
	FROM spare_part
	INNER JOIN spare_part_category ON spare_part.category_id = spare_part_category.id
	INNER JOIN car ON spare_part.car_id = car.id
`
const SparePartsByCar string = `
	SELECT spare_part.id,
	       spare_part.name,
	       spare_part.vendor_code,
	       spare_part.description,
	       spare_part_category.id,
	       spare_part_category.name
	FROM spare_part
	INNER JOIN spare_part_category ON spare_part.category_id = spare_part_category.id
	WHERE spare_part.car_id = $1
`
const AddSparePart string = `
	INSERT INTO spare_part
		(name, vendor_code, category_id, car_id, description)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id
`

// SparePartCategories
const AddSparePartCategory string = `
	INSERT INTO spare_part_category
		(name)
	VALUES ($1)
	RETURNING id
`
const SparePartCategories string = `SELECT * FROM spare_part_category`
