package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/dashbikash/fullstack-web/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var CONFIG = readConfig()

func main() {
	app := gin.New()

	app.POST("/authenticate", func(ctx *gin.Context) {
		// Create a new token object, specifying signing method and the claims
		// you would like it to contain.
		data := make(map[string]string)
		ctx.ShouldBind(&data)
		fmt.Println(data["username"])
		

		claims := &model.JwtClaims{
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
				Issuer:    "Bikash",
			},
			JwtData: map[string]string{"FullName": "Bikash", "Role": "user", "Username": data["username"]},
		}

		// Sign and get the complete encoded token as a string using the secret
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenStr, err := token.SignedString([]byte(CONFIG.JwtSecret))

		if err != nil {
			ctx.Error(err)
		}
		ctx.JSON(http.StatusOK, map[string]string{"token": tokenStr})
	})

	app.Run(":8080")
}

func readConfig() *model.Config {
	f, _ := os.Open("config.yml")
	ymlData, _ := io.ReadAll(f)
	t := &model.Config{}
	json.Unmarshal(ymlData, &t)
	return t

}
