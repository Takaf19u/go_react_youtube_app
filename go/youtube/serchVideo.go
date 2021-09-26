package youtube

import (
	// "fmt"
	"github.com/joho/godotenv"
	// "google.golang.org/api/googleapi/transport"
	// "google.golang.org/api/youtube/v3"
	"go_react_test_app/messages"
	"go_react_test_app/shared"
	"io/ioutil"
	// "log"
	"net/http"
	"os"
	"time"
)

const (
	envPath  = "./env/youtube.env"
	apiKey   = "API_KEY"
	endPoint = "https://www.googleapis.com/youtube/v3/search"
)

var (
	params      shared.SearchVideoParams
	errMessages = messages.SetErrorMessages()
)

func SearchYoutubeList(keyword string) ([]byte, error) {
	params.Keyword = keyword

	//envファイル読み込み
	youtube_key := getYoutubeKey()
	if youtube_key == "" {
		return nil, errMessages["envLoad"]
	}

	res, err := sendRequest(youtube_key)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return body, errMessages["readBody"]
	}

	return body, nil
}

// private
// -------------------------------------------------------------
func getYoutubeKey() string {
	var getKey string
	err := godotenv.Load(envPath)
	if err != nil {
		return getKey
	}
	getKey = os.Getenv(apiKey)
	return getKey
}

//リクエストを送信
func sendRequest(youtube_key string) (*http.Response, error) {
	request, err := http.NewRequest("GET", endPoint, nil)
	if err != nil {
		return nil, errMessages["getRequest"]
	}

	//クエリパラメータ
	request.URL.RawQuery = createSendParams(request, youtube_key)
	timeout := time.Duration(5 * time.Second)
	client := &http.Client{
		Timeout: timeout,
	}

	res, err := client.Do(request)
	if err != nil {
		return nil, errMessages["getRequest"]
	}

	return res, nil
}

// youtube側に送るparams作成
func createSendParams(request *http.Request, key string) string {
	sendParams := request.URL.Query()
	sendParams.Add("key", key)
	sendParams.Add("q", params.Keyword)
	sendParams.Add("part", "snippet, id")
	sendParams.Add("maxResults", "10")

	return sendParams.Encode()
}
