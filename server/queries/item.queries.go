package queries

import (
	"context"
	"errors"
	"items/db"
	"items/models"
	"log"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	collection *mongo.Collection = db.OpenCollection(db.Client, "items")
	wg 				sync.WaitGroup
)

func GetItemsQuery() ([]primitive.M, error) {
	//var products []primitive.M
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Create a channel to receive the fetched products from goroutines
	productChan := make(chan []primitive.M)

	go func() {
		var fetchedProducts []primitive.M
		for cursor.Next(ctx) {
			var product primitive.M
			err := cursor.Decode(&product)
			if err != nil {
				break
			}
			fetchedProducts = append(fetchedProducts, product)
		}
		productChan <- fetchedProducts
	}()

	// Wait for the products to be fetched from the goroutine
	fetchedProducts := <-productChan

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	if len(fetchedProducts) == 0 {
		return nil, errors.New("products not found")
	}

	return fetchedProducts, nil
}


func CreateItemQuery(item *models.Item) error {
	var wg sync.WaitGroup // To wait for goroutine to complete
	var resultErr error   // To store the error from the database operation

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	wg.Add(1)
	go func() {
			defer wg.Done()

			count, err := collection.CountDocuments(ctx, bson.M{"number": item.Number})
			if err != nil {
				log.Panic(err)
			}

			// Count the items with the same category_id
			categoryItemCount, err := collection.CountDocuments(ctx, bson.M{"category_id": item.Category_id})
			if err != nil {
				log.Panic(err)
			}

			// Check if there are more than 15 items with the same category_id
			if categoryItemCount > 15 {
				resultErr = errors.New("Cannot insert more than 15 items with the same category")
				return // Exit the goroutine if the condition is met
			}

			if count > 0 {
				resultErr = errors.New("Cannot insert item with the same number")
			} else {
				_, err = collection.InsertOne(ctx, item)
				if err != nil {
						resultErr = err
						return // Exit the goroutine if the condition is met
				}
			}
	}()

	wg.Wait() // Wait for the goroutine to finish
	return resultErr
}

func GetItemByIdQuery(id *string) (primitive.M, error) {
	var item bson.M

	// Create a channel to receive the result
	resultChan := make(chan primitive.M)
	errChan := make(chan error)

	go func() {
			// Perform the database operation asynchronously
			ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
			defer cancel()

			primitiveId, err := primitive.ObjectIDFromHex(*id)
			if err != nil {
					errChan <- err
					return
			}

			query := bson.D{primitive.E{Key: "_id", Value: primitiveId}}

			err = collection.FindOne(ctx, query).Decode(&item)
			if err != nil {
					errChan <- err
					return
			}

			resultChan <- item
	}()

	// Wait for either the result or an error
	select {
		case item := <-resultChan:
				if len(item) == 0 {
						return nil, errors.New("item not found")
				}
				return item, nil

		case err := <-errChan:
				return nil, err
	}
}

func UpdateItemByIdQuery(id *string, item *models.Item) error {
	//var err error

	// Create a channel to receive the update result
	resultChan := make(chan int64)
	errChan := make(chan error)

	go func() {
			// Perform the database update asynchronously
			ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
			defer cancel()

			primitiveId, err := primitive.ObjectIDFromHex(*id)
			if err != nil {
					errChan <- err
					return
			}

			filter := bson.D{primitive.E{Key: "_id", Value: primitiveId}}

			update := bson.D{bson.E{Key: "$set", Value: bson.D{
					bson.E{Key: "name", Value: item.Name},
					bson.E{Key: "price", Value: item.Price},
					bson.E{Key: "number", Value: item.Number},
					bson.E{Key: "category_id", Value: item.Category_id},
			}}}

			result, err := collection.UpdateOne(ctx, filter, update)
			if err != nil {
					errChan <- err
					return
			}
 
			resultChan <- result.MatchedCount
	}()

	// Wait for either the result or an error
	select {
	case matchedCount := <-resultChan:
			if matchedCount != 1 {
					return errors.New("no matched item found for update")
			}
			return nil

	case err := <-errChan:
			return err
	}
}

func DeleteItemByIdQuery(id *string) error {
	//var err error

	// Create a channel to receive the delete result
	resultChan := make(chan int64)
	errChan := make(chan error)

	go func() {
			// Perform the delete operation asynchronously
			ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
			defer cancel()

			// ID of the document to delete
			primitiveId, err := primitive.ObjectIDFromHex(*id)
			if err != nil {
					errChan <- err
					return
			}

			filter := bson.M{"_id": primitiveId}

			result, err := collection.DeleteOne(ctx, filter)
			if err != nil {
					errChan <- err
					return
			}

			resultChan <- result.DeletedCount
	}()

	// Wait for either the result or an error
	select {
	case deletedCount := <-resultChan:
			if deletedCount != 1 {
					return errors.New("no matched item found for delete")
			}
			return nil

	case err := <-errChan:
			return err
	}
}