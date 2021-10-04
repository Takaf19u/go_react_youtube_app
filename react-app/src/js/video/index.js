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
