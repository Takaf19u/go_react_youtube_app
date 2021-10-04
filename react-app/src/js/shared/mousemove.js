var area;
var menuContainer;
var clone_el;
var shiftX;
var shiftY;
var video_leftX;
var menu_leftX;

export default function getDropVideoArea(e) {
  area = document.getElementById("video_area");
  menuContainer = document.getElementById("menuContainer");
  onMouseDown(e, menuContainer)
};

function onMouseDown(e, menuContainer) {
  // 元要素の座標取得
  shiftX = e.clientX - e.target.getBoundingClientRect().left;
  shiftY = e.clientY - e.target.getBoundingClientRect().top;
  // クローン作成
  clone_el = e.target.cloneNode(true);
  clone_el.style.position = 'absolute';
  clone_el.style.zIndex = 1000;
  // cloneを area へ移動させ、相対配置をする
  area.append(clone_el);

  // クリック中の要素を（pageX、pageY）座標の中心に置く
  moveAt(e.clientX, e.clientY);
  // cloneを移動するイベント追加
  clone_el.addEventListener('mousemove', onMouseMove);

  // 要素をドロップする。不要なハンドラを削除する
  clone_el.onmouseup = function() {
    video_leftX = clone_el.getBoundingClientRect().left;
    menu_leftX = menuContainer.getBoundingClientRect().left;
    if (video_leftX < menu_leftX) {
      clone_el.removeEventListener('mousemove', onMouseMove);
      createPlayerFrame();
      area.removeAttribute('style');
      clone_el.removeAttribute('style');
    } else {
      clone_el.remove();
    }
    return null;
  };
  clone_el.ondragstart = false;
}

function moveAt(pageX, pageY) {
  clone_el.style.left = pageX - shiftX + 'px';
  clone_el.style.top = pageY - shiftY + 'px';
}

function onMouseMove(e) {
  video_leftX = clone_el.getBoundingClientRect().left;
  menu_leftX = menuContainer.getBoundingClientRect().left;
  moveAt(e.clientX, e.clientY);
  if (video_leftX < menu_leftX) {
    area.style.background = "#5d5b5b";
  } else {
    area.style.background = "black";
  }
}

// 画像をiframeに変換
function createPlayerFrame() {
  var videoClass = clone_el.getElementsByClassName("video");
  var img = videoClass[0].querySelector("img");
  var iframe = document.createElement("iframe");
  clone_el.classList.add("player");
  iframe.src = videoClass[0].dataset.url;
  videoClass[0].replaceChild(iframe, img);
}