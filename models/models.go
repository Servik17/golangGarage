package models

type SparePartCategory struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type SparePart struct {
	Id           int               `json:"id"`
	Name         string            `json:"name"`
	VendorCode   string            `json:"vendorCode"`
	Price        float64           `json:"price"`
	ResourceType uint8             `json:"resourceType"`
	Resource     int               `json:"resource"`
	Description  string            `json:"description"`
	Car          Car               `json:"car"`
	Category     SparePartCategory `json:"category"`
}

type RepairSparePart struct {
	Id         int       `json:"id"`
	AmountType uint8     `json:"amountType"`
	Amount     uint8     `json:"amount"`
	SparePart  SparePart `json:"sparePart"`
}
