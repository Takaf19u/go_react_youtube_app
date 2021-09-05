package messages

import (
	"errors"
)

func SetErrorMessages() map[string]error {
	messages := make(map[string]error)
	messages["envLoad"] = errors.New("error env load")
	messages["readBody"] = errors.New("error read body")
	messages["getRequest"] = errors.New("error Get request")
	return messages
}
