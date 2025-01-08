package main

import "github.com/gin-gonic/gin"

func setupRouter() *gin.Engine {
	// Change this to `gin.Default()` before merging to main.
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	return router
}

func ping(router *gin.Engine) *gin.Engine {
	router.GET("/api/v1/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "API is working",
		})
	})
	return router
}

func main() {
	router := setupRouter()
	router = ping(router)
	router.Run(":8080")
}
