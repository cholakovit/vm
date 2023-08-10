package routes

import (
	"items/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	//"github.com/go-playground/validator/v10"
)

func ItemRoutes(app *fiber.App) {

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	//app.Use(validator.New())

	app.Get("/items", handlers.GetItems)
	app.Post("/item", handlers.CreateItem)
	app.Get("/item/:id", handlers.GetItemById)
	app.Patch("/item/:id", handlers.UpdateItemById)
	app.Delete("/item/:id", handlers.DeleteProductById)
}
