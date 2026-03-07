package middlewares

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(

		func(w http.ResponseWriter, r *http.Request) {

			authHeader := r.Header.Get("Authorization")
			jwtToken := authHeader
			token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (any, error) {
				if _, ok := token.Method.(*jwt.SigningMethodECDSA); !ok {
					return nil, fmt.Errorf("Invalid Signing Method %v", token.Header["alg"])
				}
				return os.Getenv("JWT-SECRET"), nil
			})
			if err != nil {
				log.Println(err)
				http.Error(w, "Couldn't Verify User", http.StatusBadRequest)
				return
			}
			user_details, ok := token.Claims.(jwt.MapClaims)
			if !ok || !token.Valid {
				log.Println(token)
				http.Error(w, "Invalid AuthDetails", http.StatusBadRequest)
				return
			}
			ctx := r.Context()
			for k, val := range user_details {
				ctx = context.WithValue(ctx, k, val)
			}
			r = r.WithContext(ctx)
			fmt.Println(r.Context())
			next.ServeHTTP(w, r)

		})
}
