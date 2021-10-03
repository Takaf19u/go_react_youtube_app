import React from 'react';
import SerchVideosComponent from './videos'
import {createPlayerFrame} from '../../video/index'
import '../../../styles/serchContainer.css';
import '../../../styles/destyle.css';
import '../../../styles/pagination.css';

let video_area;
let menuContainer;

class SerchComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      listFlag: 0,
      placeholder: ["video serch keyword", "channel serch keyword"],
    };
    // thisに各メソッドを紐付け
    // これにより、this.メソッド名で呼び出せる
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    // 参照作成
    this.VideosRef = React.createRef();
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
    if (this.state.listFlag == 0) {
      this.VideosRef.current.searchVideos(this.state.keyword);
    }
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

  selectList = () => {
    if (this.state.listFlag == 0) {
      return <SerchVideosComponent onMouseDown={this.onMouseDown} ref={this.VideosRef} />
    }
  }

  render() {
    var listComponent = this.selectList();
    return (
      <div id="serchContainer" className="menus">
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.keyword} onChange={this.onChange} placeholder={this.state.placeholder[this.state.listFlag]} />
          <input type='submit' value="serch"/>
        </form>
        {listComponent}
      </div>
    );
  }
}

export default SerchComponent;
