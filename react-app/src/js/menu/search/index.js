import React from 'react';
import SearchVideosComponent from './videos'
import SearchCannelsComponent from './channels'
import '../../../styles/searchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';
import axios from 'axios';

const SEARCH_TABS_NAME = ["video_tab", "channel_tab"]
const PLSCEHOLDER = ["video_tab", "channel_tab"]
const SERVER_URL = "http://localhost:8080"
const search_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
var serchTabs = []

axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}},{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SearchComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      listComponent: null,
      keyword: "",
      listFlag: 0,
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
    var componentData;
    e.preventDefault();
    debugger
    if ( e.target.id == SEARCH_TABS_NAME[0] ) {
      componentData = [ this.state.videoRes, this.VideosRef ]
      serchTabs[0].className = "active"
      serchTabs[1].remove.className = "active"
    } else if (e.target.id == SEARCH_TABS_NAME[1]) {
      componentData = [ this.state.cannelRes, this.CannelsRef ]
      serchTabs[1].className = "active"
      serchTabs[0].remove.className = "active"
    }

    for(let i = 0; i < 100; i++) {
      ar[i] = "test";
  }

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
    var params = {method : "POST", body : JSON.stringify({keyword : this.state.keyword})};
    if (this.state.listFlag == 0) {
      this.searchVideos(params);
    }
  };

  searchVideos = (params) => {
    // this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    fetch(search_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.setState({videoRes: resJson, listComponent: this.selectList(resJson)});
      this.setJsonState(this.VideosRef, resJson);
    });
  };

  searchChannels= (params) => {
    // this.setState({items: test_data.items })
    // 何度もつなぐと取得できなくなるため
    fetch(search_YOUTUBE_VIDEO_URL, params)
    .then(res => res.json())
    .then(resJson => { 
      console.log(resJson);
      this.setState({CannelRes: resJson, listComponent: this.selectList(resJson)});
      this.setJsonState(this.CannelsRef, resJson);
    });
  };

  selectList = (res) => {
    if (this.state.listFlag == 0) {
      return <SearchVideosComponent ref={this.VideosRef} videoRes={res} />
    } else if (this.state.listFlag == 1) {
      // return <SearchCannelsComponent ref={this.CannelsRef} cannelRes={res} />
      return "test"
    }
  }

  setJsonState = (ref, res) => {
    ref.current.setJsonState(res);
  }

  render() {
    return (
      <div id="searchContainer" className="menus">
        <ul>
          <li id={SEARCH_TABS_NAME[0]} className="active" ref={ li => { serchTabs[0] = li }} onClick={this.onClick}>video</li>
          <li id={SEARCH_TABS_NAME[1]} ref={ li => { serchTabs[1] = li }} onClick={this.onClick}>channel</li>
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.keyword} onChange={this.onChange} placeholder={placeholder[this.state.listFlag]} />
          <input type='submit' value="search"/>
        </form>
        {this.state.listComponent}
      </div>
    );
  }
}

export default SearchComponent;
