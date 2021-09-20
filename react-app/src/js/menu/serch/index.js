import React from 'react';
import { createPlayerFrame } from '../../video/index'
import '../../../styles/serchContainer.css';
import '../../../styles/destyle.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"
const SERCH_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
let video_area;
let menuContainer;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SerchComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      items: [],
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  };

  // 初回のレンダリング直後にdocumentにポップアップクローズ処理をセット
  componentDidMount() {
    video_area = document.getElementById("video_area");
    menuContainer = document.getElementById("menuContainer");
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
    // 元要素の座標取得
    var shiftX = e.clientX - e.target.getBoundingClientRect().left;
    var shiftY = e.clientY - e.target.getBoundingClientRect().top;
    // クローン作成
    var clone_el = e.target.cloneNode(true);
    clone_el.style.position = 'absolute';
    clone_el.style.zIndex = 1000;

    // cloneを video_area へ移動させ、相対配置をする
    video_area.append(clone_el);
    moveAt(e.clientX, e.clientY);
    clone_el.addEventListener('mousemove', onMouseMove);

    // クリック中の要素を（pageX、pageY）座標の中心に置く
    function moveAt(pageX, pageY) {
      clone_el.style.left = pageX - shiftX + 'px';
      clone_el.style.top = pageY - shiftY + 'px';
    }

    // cloneを移動する
    function onMouseMove(e) {
      let video_leftX = clone_el.getBoundingClientRect().left;
      let menu_leftX = menuContainer.getBoundingClientRect().left;
      moveAt(e.clientX, e.clientY);
      // debugger
      if (video_leftX < menu_leftX) {
        video_area.style.background = "#5d5b5b";
      } else {
        video_area.style.background = "black";
      }
    }

    // 要素をドロップする。不要なハンドラを削除する
    clone_el.onmouseup = function() {
      let video_leftX = clone_el.getBoundingClientRect().left;
      let menu_leftX = menuContainer.getBoundingClientRect().left;
      if (video_leftX < menu_leftX) {
        clone_el.removeEventListener('mousemove', onMouseMove);
        createPlayerFrame(clone_el);
        clone_el.classList.add("player");
        video_area.removeAttribute('style');
        clone_el.removeAttribute('style');
      } else {
        clone_el.remove();
      }
      clone_el.onmouseup = null;
    };

    clone_el.ondragstart = false;
  }

  // 動画のサムネイル表示html
  createVideoImageFrame = (items) => {
    var frames = []
    if (items.length == 0) {
      frames.push('検索結果の表示');
    } else {
      items.map( (item, i) => 
        frames.push(
          <div className={"videoframe frame-" + i}
               onMouseDown={this.onMouseDown} >
            <div className="video" data-url={YOUTUBE_VIDEO_URL + item.id.videoId + "?enablejsapi=1&autoplay=1"}>
              <img className="videoImage" src={item.snippet.thumbnails.high.url} />
            </div>
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
