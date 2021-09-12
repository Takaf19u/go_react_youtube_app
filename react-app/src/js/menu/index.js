import React from 'react';
import SerchContainer from './serch/index';
import '../../styles/menuContainer.css';
import '../../styles/destyle.css';

const MENU_NAMES = { 
  "serch_menu": <SerchContainer /> 
};

class MenuComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "",
    };
    this.menu = React.createRef();
    this.menuClick = this.menuClick.bind(this);
  };

  menuClick(e) {
    this.setState({ activeMenu: e.target.id});
  };

  // メニュー用li要素を返す
  createMenuList = () => {
    return (
      Object.keys(MENU_NAMES).map( (name, key) =>
        <li id={name} className="menu_button" key={key} onClick={this.menuClick}>test</li>
      )
    )
  }

  // アクティブなコンテナを返す
  activeContainer = () => {
    var container
    for (let key in MENU_NAMES) {
      if(this.state.activeMenu == key){
        container = MENU_NAMES[key];
        break
      };
    };
    return container
  };

  render() {
    return (
      <div id="menuContainer" ref={this.menu}>
        <ul>
          {this.createMenuList()}
        </ul>
        {this.activeContainer()}
      </div>
    );
  }
}

export default MenuComponent;
