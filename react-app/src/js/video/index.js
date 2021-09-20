import React from 'react';
import MenuContainer from '../menu/index';
import '../../styles/videoContainer.css';
import '../../styles/destyle.css';

export default class PlayVideosView extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div id="videoContainer">
        <div id="video_area" />
        <MenuContainer />
      </div>
    );
  }
}

export function createPlayerFrame(videoFrame) {
  var videoClass = videoFrame.getElementsByClassName("video");
  var img = videoClass[0].querySelector("img");
  var iframe = document.createElement("iframe");
  iframe.src = videoClass[0].dataset.url;
  videoClass[0].replaceChild(iframe, img);
}
