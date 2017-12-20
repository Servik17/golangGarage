package models

// import (
// 	"./query"
// )

// type SparePartCategory struct {
// 	ID   int    `json:"id"`
// 	Name string `json:"name"`
// }

// func GetSparePartCategories() ([]SparePartCategory, error) {
// 	rows, err := garageDB.Query(query.SparePartCategories)
// 	if err != nil {
// 		return nil, err
// 	}

// 	defer rows.Close()

// 	sparePartCategories := make([]SparePartCategory, 0)

// 	for rows.Next() {
// 		sparePartCategory := SparePartCategory{}

// 		err := rows.Scan(&sparePartCategory.ID, &sparePartCategory.Name)
// 		if err != nil {
// 			return nil, err
// 		}

// 		sparePartCategories = append(sparePartCategories, sparePartCategory)
// 	}

// 	return sparePartCategories, nil
// }

// func AddSparePartCategory(category *SparePartCategory) (int, error) {
// 	row := garageDB.QueryRow(
// 		query.AddSparePartCategory,
// 		category.Name,
// 	)

// 	return getIdFromRow(row)
// }
