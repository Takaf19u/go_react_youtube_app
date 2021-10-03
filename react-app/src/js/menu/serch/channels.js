import React from 'react';
import PaginateComponent from '../../shared/paginate'
import '../../../styles/serchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080"
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"
axios.defaults.baseURL = SERVER_URL;
axios.proxy = true;

const test_data = {"status":200,"items":[{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}},{"etag":"5ot5KpfbALneb-jBJHrczgK5mxc","id":{"kind":"youtube#video","videoId":"ov2bddGeR_o"},"kind":"youtube#searchResult","snippet":{"channelId":"UCLkAepWjdylmXSltofFvsYQ","channelTitle":"BANGTANTV","description":"A surprise appear while in Southeast Asia: BTS are nominated for a Billboard Music Award! Will success on the global stage change them? The members are ...","liveBroadcastContent":"none","publishTime":"2018-04-25T15:00:00Z","publishedAt":"2018-04-25T15:00:00Z","thumbnails":{"default":{"height":90,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/default.jpg","width":120},"high":{"height":360,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/hqdefault.jpg","width":480},"medium":{"height":180,"url":"https://i.ytimg.com/vi/ov2bddGeR_o/mqdefault.jpg","width":320}},"title":"Ep6 Moonchild | BTS: Burn the Stage"}}]}


class SerchCannelsComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      serchView: null, 
      totalVideos: 0,
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.pageChange = this.pageChange.bind(this);
  };

  pageChange(data) {
    
    this.setState({serchView: this.videoList(this.props.videoRes.items, data['selected']) })
  }

  setJsonState = (jsonRes) => {
    this.setState({totalVideos: jsonRes.itemLength,
                   serchView: this.videoList(jsonRes.items)})
  }

  videoList = (items, selectPage = 0) => {
    var frames = this.createVideoImageFrame(items, selectPage);
    return frames.map( (item, id) => <li key={id}>{item}</li>)
  }

  // 選択したページの情報を作成
  createVideoImageFrame = (items, selectPage) => {
    var frames = []
    if (items.length == 0) {
      frames.push('');
    } else {
      items[selectPage].map( (item, i) => 
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
                    items={this.props.videoRes.items} />
    return (
      <div id="VideoList">
        <div className="pagination_contents">{paginate}</div>
        <ul className="videoList">
          {this.state.serchView }
        </ul>
      </div>
    );
  }
}

export default SerchCannelsComponent;