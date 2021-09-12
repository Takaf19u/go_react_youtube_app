import React from 'react';
import '../../styles/header.css';
import '../../styles/destyle.css';

const BUTTONS = ["menu", "close"]
var menuContainer;

class HeaderComponent extends React.Component {
  // コンストラクタ。初期設定を行う
  constructor(props) {
    super(props);
    this.state = {
      menuStatus: false,
    };
    this.menubtn = React.createRef();
    this.onClick = this.onClick.bind(this);
  };

  onClick() {
    if(this.state.menuStatus) {
      menuContainer.classList.remove("active");
      this.setState({menuStatus: false})
      this.menubtn.current.id = BUTTONS[0];
    } else {
      menuContainer.classList.add("active");
      this.setState({menuStatus: true})
      this.menubtn.current.id = BUTTONS[1];
    };
  }


  render() {
    return (
      <button ref={this.menubtn} onClick={this.onClick}><span></span></button>
    )
  };
}

window.addEventListener('DOMContentLoaded', () => {
  menuContainer = document.getElementById("menuContainer");
});

export default HeaderComponent;
