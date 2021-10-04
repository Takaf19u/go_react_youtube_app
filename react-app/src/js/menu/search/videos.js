import React from 'react';
import PaginateComponent from '../../shared/paginate'
import Mousemove from '../../shared/mousemove'
import '../../../styles/searchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';

const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/"

class SearchVideosComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      searchView: null, 
      totalVideos: 0,
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.pageChange = this.pageChange.bind(this);
  };

  pageChange(data) {
    this.setState({searchView: this.videoList(this.props.videoRes.items, data['selected']) })
  }

  setJsonState = (jsonRes) => {
    this.setState({totalVideos: jsonRes.itemLength,
                   searchView: this.videoList(jsonRes.items)})
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
                onMouseDown={Mousemove} >
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
                    total={this.props.videoRes.itemLength}
                    items={this.props.videoRes.items} />
    return (
      <div id="VideoList">
        <div className="pagination_contents">{paginate}</div>
        <ul className="videoList">
          {this.state.searchView }
        </ul>
      </div>
    );
  }
}

export default SearchVideosComponent;
