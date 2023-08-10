package routes

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func InitRoutes() {
	app := fiber.New()

	ItemRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT environment variable is not set")
	}

	err := app.Listen(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
