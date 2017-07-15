package models

import "./query"

type Car struct {
	ID      int    `json:"id"`
	Mark    string `json:"mark"`
	Model   string `json:"model"`
	Mileage int    `json:"mileage"`
}

func GetCars() ([]Car, error) {
	rows, err := garageDB.Query(query.Cars)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	cars := make([]Car, 0)

	for rows.Next() {
		car := Car{}

		err := rows.Scan(&car.ID, &car.Mark, &car.Model, &car.Mileage)
		if err != nil {
			return nil, err
		}

		cars = append(cars, car)
	}

	return cars, nil
}

func GetCar(id int) (*Car, error) {
	row := garageDB.QueryRow(query.Car, id)

	car := Car{}

	err := row.Scan(&car.ID, &car.Mark, &car.Model, &car.Mileage)
	if err != nil {
		return nil, err
	}

	return &car, nil
}

func AddCar(car *Car) (int, error) {
	row := garageDB.QueryRow(query.AddCar, car.Mark, car.Model, car.Mileage)

	return getIdFromRow(row)
}

func UpdateCar(car *Car, carID int) error {
	garageDB.QueryRow(query.UpdateCar, car.Mark, car.Model, car.Mileage, carID)

	return nil
}
