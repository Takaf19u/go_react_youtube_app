import React from 'react';
import logo from './logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import './styles/App.css';
import './styles/destyle.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"
const SERCH_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;


class App extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      items: [],
      videoUrls: [],
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    this.setState({ keyword: e.target.value});
  };

  onSubmit(e) {
    e.preventDefault();
    var params = {method : "POST", body : JSON.stringify({keyword : this.state.keyword})};
    fetch(SERCH_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.state.items = resJson.items
      this.setState({videoUrls: this.state.items.map( item => YOUTUBE_VIDEO_URL + item.id.videoId )})
    });
  };

  render() {
    var videoFrame = createVideoFrame(this.state.items);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>キーワード入力でyoutubeの検索結果をかえす</p>
          <form onSubmit={this.onSubmit}>
            <input type='text' value={this.state.value} onChange={this.onChange} />
            <input type='submit' value="送信"/>
          </form>
          <ul className="videoList">
            {videoFrame.map( (item, id) => <li key={id}>{item}</li>) }
          </ul>
        </header>
      </div>
    );
  }
}

// 動画埋め込み用のhtmlを返す
function createVideoFrame(items) {
  var frames = []
  if (items.length == 0) {
    frames.push('検索結果の表示');
  } else {
    items.map( (item, i) => 
      frames.push(
        <div className={"videoframe frame-" + i}>
          <div className="video">
            <img className="videoImage" src={"https://i.ytimg.com/vi/" + item.id.videoId + "/hqdefault.jpg"} />
          </div>
          <FontAwesomeIcon icon={faYoutube} />
        </div>
      )
    )
  }
  return frames
}

// class VideoList extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {this.props.value[0]}
//       </button>
//     );
//   }
// }

export default App;
