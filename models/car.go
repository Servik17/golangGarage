package models

type Car struct {
	Id      int    `json:"id"`
	Mark    string `json:"mark"`
	Model   string `json:"model"`
	Mileage int    `json:"mileage"`
}

func GetCars() ([]Car, error) {
	rows, err := garageDB.Query("SELECT * FROM car")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	cars := make([]Car, 0)

	for rows.Next() {
		car := Car{}

		err := rows.Scan(&car.Id, &car.Mark, &car.Model, &car.Mileage)
		if err != nil {
			return nil, err
		}

		cars = append(cars, car)
	}

	return cars, nil
}

func GetCar(id string) (*Car, error) {
	row := garageDB.QueryRow("SELECT * FROM car WHERE id=$1", id)

	car := Car{}

	err := row.Scan(&car.Id, &car.Mark, &car.Model, &car.Mileage)
	if err != nil {
		return nil, err
	}

	return &car, nil
}

func AddCar(car *Car) (int, error) {
	row := garageDB.QueryRow(`INSERT INTO car (mark, model, mileage) VALUES ($1, $2, $3) RETURNING id`, car.Mark, car.Model, car.Mileage)

	var id int

	err := row.Scan(id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func UpdateCar(car *Car, carId string) error {
	garageDB.QueryRow(`UPDATE car SET (mark, model, mileage) = ($1, $2, $3) WHERE id=$4`, car.Mark, car.Model, car.Mileage, carId)

	return nil
}
