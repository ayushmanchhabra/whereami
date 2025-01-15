package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func setupRouter() *gin.Engine {
	// Change this to `gin.Default()` before merging to main.
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	return router
}

func setupSecurityHeaders(router *gin.Engine, expectedHost string) *gin.Engine {
	router.Use(func(c *gin.Context) {
		if c.Request.Host != expectedHost {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid host header"})
			return
		}
		c.Header("X-Frame-Options", "DENY")
		c.Header("Content-Security-Policy", "default-src 'self'; connect-src *; font-src *; script-src-elem * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline';")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
		c.Header("Referrer-Policy", "strict-origin")
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("Permissions-Policy", "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()")
		c.Next()
	})

	return router
}

func setupCors(router *gin.Engine, origins []string) *gin.Engine {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "User-Agent"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	return router
}

func setupSessions(router *gin.Engine) *gin.Engine {
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))
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

type Login struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func signin(c *gin.Context) {
	var json Login
	err := c.ShouldBindJSON(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login request."})
		return
	} else if json.Username != os.Getenv("ADMIN_USERNAME") && json.Password != os.Getenv("ADMIN_PASSWORD") {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect username or password."})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Welcome back, %s!", json.Username)})
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	router := setupRouter()
	router = setupSecurityHeaders(router, "localhost:8080")
	router = setupCors(router, []string{"http://localhost:5173"})
	router = setupSessions(router)
	router = ping(router)
	router.POST("/api/v1/auth/signin", signin)
	router.Run(":8080")
}
