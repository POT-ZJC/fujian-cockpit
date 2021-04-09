import { computedFontSize } from "./htmlFontSize";
import { mutationsSet } from "../cockpitStore";
 // 监听屏幕
 function watchClien() {
    const fontSize = computedFontSize(window.document.querySelector("html"));
    mutationsSet("fontSize", fontSize);
    // debugger
    const _w = window.innerWidt || window.document.body.clientWidth,
      _h = window.innerHeight || window.document.body.clientHeight;
    const clientRatio = _w / _h;
    //设置宽屏等级
    if (clientRatio >= 3.4) {
      //特宽
      mutationsSet("wideScreenLevel", 3);
    } else if (clientRatio >= 2.6) {
      //宽
      mutationsSet("wideScreenLevel", 2);
    } else {
      //普通
      mutationsSet("wideScreenLevel", 1);
    }
  }
function resizeLoad() { 
  watchClien();
  window.addEventListener(
	"resize",watchClien,false
);
}

function resizeRemove() {
    window.removeEventListener("resize",watchClien); 
    const fontSize=14;
    window.document.querySelector("html").style.fontSize = fontSize + "px"; 
}
export { resizeLoad,resizeRemove };
