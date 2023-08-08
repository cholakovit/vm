package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Item struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Name   string             `json:"name" binding:"required,min=2" 			bson:"name"`
	Number float32            `json:"number"															bson:"number"`
	Price  float64            `json:"price" binding:"required"						bson:"price"`
}
