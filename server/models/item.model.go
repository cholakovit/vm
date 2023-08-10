package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Item struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Name        string             `json:"name" validate:"required,min=2"`
	Number      float32            `json:"number"`
	Price       float64            `json:"price" validate:"required"`
	Category_id string             `json:"category_id" validate:"required"`
}
