import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const WATCH_YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch"
const SERCH_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test = items => {
  var url = WATCH_YOUTUBE_VIDEO_URL + items;
  return url
};

class App extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      items: "",
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
      test(this.state.items);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>キーワード入力でyoutubeの検索結果をかえす</p>
          <form onSubmit={this.onSubmit}>
            <input type='text' value={this.state.value} onChange={this.onChange} />
            <input type='submit' value="送信"/>
          </form>
          <p>{test(this.state.items)}</p>
        </header>
      </div>
    );
  }
}

export default App;
