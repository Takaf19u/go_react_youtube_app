package youtube

import (
	"encoding/json"
	"net/http"
)

type YoutubeResponse struct {
	Status     int           `json:"status"`
	ItemLength int           `json:"itemLength"`
	Items      []interface{} `json:"items"`
}

type YoutubeItems struct {
	Items []interface{}
}

const maxPageVideosCount = 2

func FormatResponse(res []byte) YoutubeResponse {
	var youtubeRes YoutubeResponse
	var youtubeItems YoutubeItems

	json.Unmarshal(res, &youtubeItems)
	youtubeRes.Status = http.StatusOK
	youtubeRes.ItemLength = len(youtubeItems.Items)
	var sliceVideos []interface{}
	SliceArray(youtubeItems.Items, &sliceVideos, maxPageVideosCount)

	for i, _ := range sliceVideos {
		youtubeRes.Items = append(youtubeRes.Items, sliceVideos[i])
	}

	return youtubeRes
}

func SliceArray(originArray []interface{}, sliceArray *[]interface{}, sliceCnt int) {
	var endIndex int
	arrayCnt := len(originArray)

	for i := 0; i < arrayCnt; i += sliceCnt {
		endIndex = i + sliceCnt
		if arrayCnt < endIndex {
			endIndex = arrayCnt
		}
		*sliceArray = append(*sliceArray, originArray[i:endIndex])
	}
}
