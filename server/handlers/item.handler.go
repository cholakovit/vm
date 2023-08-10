package handlers

import (
	"items/models"
	"items/queries"
	vs "items/validationMessages"
	"log"

	"sync"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var (
	item		*models.Item
	wg 				sync.WaitGroup
	validate *validator.Validate
)

// special function in Go that is automatically called before the main() function. 
// It's used to perform initialization tasks before your program starts running.
func init() {
	validate = validator.New()
}

func GetItems(c *fiber.Ctx) error {

	items, err := queries.GetItemsQuery()
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(items)
}

func CreateItem(c *fiber.Ctx) error {
	// Bind and validate the request body
	if err := c.BodyParser(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": err.Error()})
	}

	log.Println("TEST 1")

	// Validate the item
	if msgErr := validateItem(item); msgErr != "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": msgErr})
	}

	log.Println("TEST 2")

	err := queries.CreateItemQuery(item)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "create item success"})
}

func GetItemById(c *fiber.Ctx) error {
	id := c.Params("id")
	itemById, err := queries.GetItemByIdQuery(&id)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(itemById)
}

func UpdateItemById(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := c.BodyParser(&item); err != nil {
		errMsg := vs.ProductMessageValidate(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": errMsg})
	}

	err := queries.UpdateItemByIdQuery(&id, item)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "update item success"})
}

func DeleteProductById(c *fiber.Ctx) error {
	id := c.Params("id")

	err := queries.DeleteItemByIdQuery(&id)
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "delete item success"})
}

func validateItem(item *models.Item) string {
	if err := validate.Struct(item); err != nil {
		msgErr := vs.ProductMessageValidate(err)
		return msgErr
	}
	return ""
}