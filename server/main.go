package main

import (
	"items/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)	

	routes.InitRoutes()
}