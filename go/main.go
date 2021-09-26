package main

import (
	"encoding/json"
	// "fmt"
	"io/ioutil"
	"log"
	// "google.golang.org/api/googleapi/transport"
	// "google.golang.org/api/youtube/v3"
	"go_react_test_app/shared"
	"go_react_test_app/youtube"
	"net/http"
)

func main() {
	// POST
	// http.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Header().Set("Access-Control-Allow-Headers", "*")
	// 	w.Header().Set("Access-Control-Allow-Origin", "*")
	// 	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	// 	var user User
	// 	json.NewDecoder(r.Body).Decode(&user)
	// 	fmt.Fprintf(w, "Hello!")
	// 	fmt.Fprintf(w, "%s Hello!", user.Name)
	// })

	// GET
	// http.HandleFunc("/get", func(w http.ResponseWriter, r *http.Request) {
	// 	ping := Ping{http.StatusOK, "ok"}
	// 	res, err := json.Marshal(ping)
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusInternalServerError)
	// 		return
	// 	}
	// 	w.Header().Set("Access-Control-Allow-Origin", "*")
	// 	w.Write(res)
	// 	yuta := "yuta"
	// 	fmt.Fprintf(w, "test")
	// 	log.Println(yuta)
	// })
	http.HandleFunc("/get", func(w http.ResponseWriter, r *http.Request) {
		var params shared.SearchVideoParams

		// request body読み込み
		defer r.Body.Close()
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
			return
		}
		// json.Unmarshalはjsonを構造体に変換
		// func Unmarshal(data []byte, v interface{}) error
		json.Unmarshal(body, &params)
		res, err := youtube.SearchYoutubeList(params.Keyword)
		if err != nil {
			log.Println(err)
			return
		}

		youtubeRes := youtube.FormatResponse(res)
		jsonRes, _ := json.Marshal(youtubeRes)

		// ヘッダー設定
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonRes)
	})

	http.ListenAndServe(":8080", nil)
}
