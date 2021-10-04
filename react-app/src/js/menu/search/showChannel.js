import React from 'react';
import PaginateComponent from '../../shared/paginate'
import Mousemove from '../../shared/mousemove'
import '../../../styles/searchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"
const search_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}},{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SearchVideosComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      videoFrame: [], 
      totalVideos: 0,
      selectPage: 0,
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.pageChange = this.pageChange.bind(this);
  };

  searchVideos = (keyword) => {
    var params = {method : "POST", body : JSON.stringify({keyword : keyword})};
    // this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    fetch(search_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.setState({items: resJson.items,
                     totalVideos: resJson.itemLength,
                     videoFrame: this.createVideoImageFrame(resJson.items) })
    });
  };

  pageChange(data) {
    var pageNumber = data['selected'];
    this.setState({selectPage: pageNumber, videoFrame: this.createVideoImageFrame(this.state.items) })
    
  }

  // 選択したページの情報を作成
  createVideoImageFrame = (items) => {
    var frames = []
    if (items.length == 0) {
      frames.push('');
    } else {
      items[this.state.selectPage].map( (item, i) => 
        frames.push(
          <div>
            <div className={"videoframe frame-" + i}
                onMouseDown={this.props.onMouseDown} >
              <div className="video" data-url={YOUTUBE_VIDEO_URL + item.id.videoId + "?enablejsapi=1&autoplay=1"}>
                <img className="videoImage" src={item.snippet.thumbnails.high.url} />
              </div>
            </div>
            <ul>
              <li>{item.snippet.title}</li>
              <li>{item.snippet.channelTitle}</li>
            </ul>
          </div>
        )
      )
    }
    return frames
  }

  render() {
    var paginate = <PaginateComponent
                    pageChange={this.pageChange}
                    total={this.state.totalVideos}
                    items={this.state.items} />
    return (
      <div id="VideoList">
        <div className="pagination_contents">{paginate}</div>
        <ul className="videoList">
          {this.state.videoFrame.map( (item, id) => <li key={id}>{item}</li>) }
        </ul>
      </div>
    );
  }
}

export default SearchVideosComponent;
