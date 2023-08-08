package handlers

import (
	"items/models"
	"items/queries"
	vs "items/validationMessages"
	"net/http"

	"sync"

	"github.com/gin-gonic/gin"
)

var (
	item		*models.Item
	wg 				sync.WaitGroup
)

func GetItems(c *gin.Context) {
	items, err := queries.GetItemsQuery()
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func CreateItem(c *gin.Context) {
	if err := c.ShouldBindJSON(&item); err != nil {
		errMsg := vs.ProductMessageValidate(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": errMsg})
		return
	}

	err := queries.CreateItemQuery(item)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{ "message": err.Error() })
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "create item success"})
}

func GetItemById(c *gin.Context) {
	id := c.Param("id")
	itemById, err := queries.GetItemByIdQuery(&id)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, itemById)
}

func UpdateItemById(c *gin.Context) {
	id := c.Param("id")
	if err := c.ShouldBindJSON(&item); err != nil {
		errMsg := vs.ProductMessageValidate(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": errMsg})
		return
	}
		
	err := queries.UpdateItemByIdQuery(&id, item)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{ "message": err.Error() })
		return
	}	

	c.JSON(http.StatusOK, gin.H{"message": "update item success"})
}

func DeleteProductById(c *gin.Context) {
	id := c.Param("id")

	err := queries.DeleteItemByIdQuery(&id)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{ "message": err.Error() })
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "delete item success"})
}