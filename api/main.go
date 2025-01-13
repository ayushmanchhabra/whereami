package main

import (
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	// Change this to `gin.Default()` before merging to main.
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "User-Agent"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
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

func signin(router *gin.Engine) *gin.Engine {
	router.POST("/api/v1/auth/signin", func(c *gin.Context) {
		session := sessions.Default(c)
		session.Set("username", c.PostForm("username"))
		session.Save()
		c.JSON(200, gin.H{
			"message": fmt.Sprintln("Username: ", c.PostForm("username"), "Password: ", c.PostForm("password")),
		})
	})
	return router
}

func main() {
	router := setupRouter()
	router = ping(router)
	router = signin(router)
	router.Run(":8080")
}
