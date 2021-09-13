import React from 'react';
import SerchComponent from './serch/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../styles/menuContainer.css';
import '../../styles/destyle.css';

const MENU_NAMES = ["serch_menu"]
const MENU_CONTENTS = { 
  "serch_menu" : [ <SerchComponent />, <FontAwesomeIcon icon={faSearch} /> ],
  "test_menu" : [ "", <FontAwesomeIcon icon={faSearch} /> ]
};

class MenuComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: MENU_NAMES[0],
    };
    this.menu = React.createRef();
    this.menuClick = this.menuClick.bind(this);
  };

  menuClick(e) {
    this.setState({ activeMenu: e.target.id});
  };

  // メニュー用li要素を返す
  createMenuList = () => {
    var Lists = [];
    var li_name;
    for (let key in MENU_CONTENTS) {
      li_name = "menu_button"
      if(this.state.activeMenu == key){ li_name = li_name + " active" };
      Lists.push(
        <li id={key} className={li_name} onClick={this.menuClick}>{MENU_CONTENTS[key][1]}</li>
      );
    };
    return (
      <ul>
        {Lists}
      </ul>
    )
  }

  // アクティブなコンテナを返す
  activeContainer = () => {
    var container
    for (let key in MENU_CONTENTS) {
      if(this.state.activeMenu == key){
        container = MENU_CONTENTS[key][0];
        break
      };
    };
    return container
  };

  render() {
    return (
      <div id="menuContainer" ref={this.menu}>
        {this.createMenuList()}
        {this.activeContainer()}
      </div>
    );
  }
}

export default MenuComponent;
