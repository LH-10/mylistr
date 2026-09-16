package utils

import (
	"fmt"
	"io"
	"os"
)

func SaveFile(image_file io.Reader, filename string) error {

	file, err := os.Create(filename)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = io.Copy(file, image_file)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}
