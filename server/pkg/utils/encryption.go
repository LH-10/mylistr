package utils

import (
	"crypto/sha512"
	"fmt"
)

func Hash(text *string) {
	*text = fmt.Sprintf("%x", sha512.Sum512([]byte(*text)))
	fmt.Println("hashed successfully")
}

func CompareHash(input string, dbHash string) bool {
	Hash(&input)
	return dbHash == input
}
