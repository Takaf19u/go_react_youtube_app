import React from 'react';
import SerchVideosComponent from './videos'
import SerchCannelsComponent from './channels'
import '../../../styles/serchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const SERCH_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}},{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SerchComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      listComponent: null,
      keyword: "",
      listFlag: 0,
      placeholder: ["video serch keyword", "channel serch keyword"],
      videoRes: [],
      cannelRes: [],
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // 参照作成
    this.VideosRef = React.createRef();
    this.CannelsRef = React.createRef();
  };

  onClick(e) {
    e.preventDefault();
    var componentData = e.target.id == "video_tab" ? [this.state.videoRes, this.VideosRef] : [this.state.cannelRes, this.CannelsRef];
    var component = componentData[0].length == 0 ? null : this.selectList(componentData[0]);
    this.setState({listComponent: component},()=>{
      if (component === null) return
      this.setJsonState(componentData[1], componentData[0]);
    });
  }

  onChange(e) {
    this.setState({ keyword: e.target.value});
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.state.listFlag == 0) {
      this.searchVideos(this.state.keyword);
    }
  };

  searchVideos = (keyword) => {
    var params = {method : "POST", body : JSON.stringify({keyword : keyword})};
    // this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    fetch(SERCH_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.setState({videoRes: resJson, listComponent: this.selectList(resJson)});
      this.setJsonState(this.VideosRef, resJson);
    });
  };

  searchChannels= (keyword) => {
    var params = {method : "POST", body : JSON.stringify({keyword : keyword})};
    // this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    fetch(SERCH_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.setState({CannelRes: resJson, listComponent: this.selectList(resJson)});
      this.setJsonState(this.CannelsRef, resJson);
    });
  };

  selectList = (res) => {
    if (this.state.listFlag == 0) {
      return <SerchVideosComponent ref={this.VideosRef} videoRes={res} />
    } else if (this.state.listFlag == 1) {
      // return <SerchCannelsComponent ref={this.CannelsRef} cannelRes={res} />
      return "test"
    }
  }

  setJsonState = (ref, res) => {
    ref.current.setJsonState(res);
  }

  render() {
    return (
      <div id="serchContainer" className="menus">
        <ul>
          <li id="video_tab" onClick={this.onClick}>video</li>
          <li id="channel_tab" onClick={this.onClick}>channel</li>
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.keyword} onChange={this.onChange} placeholder={this.state.placeholder[this.state.listFlag]} />
          <input type='submit' value="serch"/>
        </form>
        {this.state.listComponent}
      </div>
    );
  }
}

export default SerchComponent;
