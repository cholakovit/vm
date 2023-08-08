package routes

import (
	"items/handlers"
	"items/middleware"

	"github.com/gin-gonic/gin"
)

func ItemRoutes(router *gin.Engine) {
	router.Use(middleware.CORSMiddleware())
	router.GET("/items", handlers.GetItems)
	router.POST("/item", handlers.CreateItem)
	router.GET("/item/:id", handlers.GetItemById)
	router.PATCH("/item/:id", handlers.UpdateItemById)
	router.DELETE("/item/:id", handlers.DeleteProductById)
}