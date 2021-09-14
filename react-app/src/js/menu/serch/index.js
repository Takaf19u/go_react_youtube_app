import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../../../styles/serchContainer.css';
import '../../../styles/destyle.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"
const SERCH_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"adMBDxnhJMw"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/adMBDxnhJMw/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/adMBDxnhJMw/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/adMBDxnhJMw/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SerchComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      items: [],
      videoContainer: null,
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  };

  // 初回のレンダリング直後にdocumentにポップアップクローズ処理をセット
  componentDidMount() {
    this.videoContainer = document.getElementById("videoContainer");
  };


  onChange(e) {
    this.setState({ keyword: e.target.value});
  };

  onSubmit(e) {
    e.preventDefault();
    var params = {method : "POST", body : JSON.stringify({keyword : this.state.keyword})};
    this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    // fetch(SERCH_YOUTUBE_VIDEO_URL, params)
    // .then(res => res.json())
    // .then(resJson => { 
    //   console.log(resJson);
    //   this.setState({items: resJson.items})
    // });
  };

  onMouseDown(e) {
    var shiftX = e.clientX - e.target.getBoundingClientRect().left;
    var shiftY = e.clientY - e.target.getBoundingClientRect().top;

    e.target.style.position = 'absolute';
    e.target.style.zIndex = 1000;
    // 現在の親から videoContainer へ移動させ、相対配置をする
    this.videoContainer.append(e.target);
    moveAt(e.clientX, e.clientY);
    e.target.addEventListener('mousemove', onMouseMove);

    // クリック中の要素を（pageX、pageY）座標の中心に置く
    function moveAt(pageX, pageY) {
      e.target.style.left = pageX - shiftX + 'px';
      e.target.style.top = pageY - shiftY + 'px';
    }
    // ボールを移動する
    function onMouseMove(e) {
      moveAt(e.clientX, e.clientY);
    }
    // 要素をドロップする。不要なハンドラを削除する
    e.target.onmouseup = function() {
      e.target.removeEventListener('mousemove', onMouseMove);
      e.target.style.position = 'static';
      e.target.style.zIndex = 0;
      e.target.onmouseup = null;
    };

    e.target.ondragstart = false;
  }

  // 動画のサムネイル表示html
  createVideoImageFrame = (items) => {
    var frames = []
    if (items.length == 0) {
      frames.push('検索結果の表示');
    } else {
      items.map( (item, i) => 
        frames.push(
          <div className={"videoframe frame-" + i} onMouseDown={this.onMouseDown} >
            {/* <div className="video">
              <img className="videoImage" src={item.snippet.thumbnails.high.url} />
            </div>
            <FontAwesomeIcon icon={faYoutube} /> */}
          </div>
        )
      )
    }
    return frames
  }

  render() {
    var videoFrame = this.createVideoImageFrame(this.state.items);
    return (
      <div id="serchContainer" className="menus">
        <div id="serch_menu" className="menu_button"></div>
        <p>キーワード入力でyoutubeの検索結果をかえす</p>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.value} onChange={this.onChange} />
          <input type='submit' value="送信"/>
        </form>
        <ul className="videoList">
          {videoFrame.map( (item, id) => <li key={id}>{item}</li>) }
        </ul>
      </div>
    );
  }
}

export default SerchComponent;
