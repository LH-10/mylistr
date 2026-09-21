package directories

import (
	"fmt"
	"os"
	"path"
)

const Root string = "uploads"
const Images string = "images"
const GameDir string = "games"
const u_root string = "media"

var f_GameImagePath string
var user_GameImagePath string

func FSGameImagePath() string {
	return f_GameImagePath
}

func UsrGameImagePath() string {
	return user_GameImagePath
}

func create_GameImageDir() {
	err := os.Mkdir(f_GameImagePath, os.ModePerm)

	if err != nil {
		fmt.Print(err)
	}
}

func init_ImagePath() {
	f_GameImagePath = path.Join(".", Root, Images, GameDir)
	user_GameImagePath = path.Join("/", u_root, GameDir, Images)
}

func init() {
	init_ImagePath()
	go create_GameImageDir()
}
