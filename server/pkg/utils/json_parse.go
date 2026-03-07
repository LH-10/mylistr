package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func ParseJson(r *http.Request, obj any) error {
	if body, err := io.ReadAll(r.Body); err == nil {
		err = json.Unmarshal(body, obj)
		if err != nil {
			fmt.Println("Json Parse Error")
			return err
		}
	} else {
		return err
	}
	return nil
}
