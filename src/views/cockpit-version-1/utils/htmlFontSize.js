const MAX_FONT_SIZE = 210;
const MIN_FONT_SIZE = 50;
export function computedFontSize(html) {
  // 获取根元素 fontSize 标准，屏幕宽度 / 10 设计图宽1920，高1080
  let w_fontSize = window.innerWidth / 19.2;
  let h_fontSize = window.innerHeight / 10.8;
  let fontSize = w_fontSize;
  w_fontSize > h_fontSize && (fontSize = h_fontSize);
  // if (fontSize < MIN_FONT_SIZE) {
  //     // 定义根元素（html）fontSize 的大小 （rem）
  //     fontSize = MIN_FONT_SIZE
  // } else if (fontSize > MAX_FONT_SIZE) {
  //     // newFontSize = MAX_FONT_SIZE
  //     // newFontSize = fontSize
  // }
//   console.log('fontSize',fontSize)
  html.style.fontSize = fontSize + "px";

  return fontSize;
}
