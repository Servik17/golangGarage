package models

// import (
// 	"./query"
// )

// type SparePart struct {
// 	ID          int               `json:"id"`
// 	Name        string            `json:"name"`
// 	VendorCode  string            `json:"vendorCode"`
// 	Description string            `json:"description"`
// 	Category    SparePartCategory `json:"category"`
// }

// func AddSparePart(name, vendor_code string, category_id int, car_id int, description string) (int, error) {
// 	row := garageDB.QueryRow(
// 		query.AddSparePart,
// 		name, vendor_code, category_id, car_id, description,
// 	)

// 	return getIdFromRow(row)
// }

// func GetSpareParts(carID int) ([]SparePart, error) {
// 	rows, err := garageDB.Query(query.SparePartsByCar, carID)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()

// 	spareParts := make([]SparePart, 0)

// 	for rows.Next() {
// 		sparePart := SparePart{}

// 		err := rows.Scan(
// 			&sparePart.ID,
// 			&sparePart.Name,
// 			&sparePart.VendorCode,
// 			&sparePart.Description,
// 			&sparePart.Category.ID,
// 			&sparePart.Category.Name,
// 		)
// 		if err != nil {
// 			return nil, err
// 		}

// 		spareParts = append(spareParts, sparePart)
// 	}

// 	return spareParts, nil
// }
