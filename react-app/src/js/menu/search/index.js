import React from 'react';
import SearchVideosComponent from './videos'
import SearchCannelsComponent from './channels'
import '../../../styles/searchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';
import axios from 'axios';
import { faTintSlash } from '@fortawesome/free-solid-svg-icons';

const SEARCH_TABS_NAME = ["video_tab", "channel_tab"]
const SEARCH_TABS_VALUE = ["video", "channel"]
const PLSCEHOLDER = ["search video", "search channel"]
const SERVER_URL = "http://localhost:8080"
const search_YOUTUBE_VIDEO_URL = `${SERVER_URL}/get`;
var searchTabs = []

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
    e.preventDefault();
    var listFlag;
    var tabsData = {
      [SEARCH_TABS_NAME[0]]: [ this.state.videoRes, this.VideosRef ],
      [SEARCH_TABS_NAME[1]]: [ this.state.cannelRes, this.CannelsRef ],
    };

    for(var i = 0; i < searchTabs.length; i++) {
      if (searchTabs[i].className == "active") {
        searchTabs[i].remove.className = "active"
        break
      }
    }

    switch (e.target.id) {
      case SEARCH_TABS_NAME[1]:
        searchTabs[1].className = "active"
        listFlag = 1
        break
      default:
        // どれも該当しない場合、動画検索画面を格納
        searchTabs[0].className = "active"
        listFlag = 0
    }

    var componentData = tabsData[SEARCH_TABS_NAME[listFlag]]
    var component = "items" in componentData[0] ? this.selectList(componentData[0]) : null;
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
      return null
    }
  }

  setJsonState = (ref, res) => {
    ref.current.setJsonState(res);
  }

  render() {
    return (
      <div id="searchContainer" className="menus">
        <ul>
          {SEARCH_TABS_NAME.map( (name, id) => 
            <li id={name} ref={ li => { searchTabs[id] = li }} onClick={this.onClick}>{SEARCH_TABS_VALUE[id]}</li>
          )}
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.keyword} onChange={this.onChange} placeholder={PLSCEHOLDER[this.state.listFlag]} />
          <input type='submit' value="search"/>
        </form>
        {this.state.listComponent}
      </div>
    );
  }
}

export default SearchComponent;
