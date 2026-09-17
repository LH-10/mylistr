package directories

import (
	"fmt"
	"os"
	"path"
)

const Root string = "uploads"
const Images string = "images"
const GameDir string = "games"

func CreateGameImageDir() {
	err := os.Mkdir(path.Join(".", Root, Images, GameDir), os.ModePerm)

	if err != nil {
		fmt.Print(err)
	}
}
func init() {
	CreateGameImageDir()
}
