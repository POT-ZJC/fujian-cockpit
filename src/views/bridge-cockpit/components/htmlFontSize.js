// 定义最大的 fontSize
const MAX_FONT_SIZE = 210
const MIN_FONT_SIZE = 60
// 1920窗口下  1rem =96px
export function computedFontSize(html) {
    // 获取根元素 fontSize 标准，屏幕宽度 / 10
    const  clientWidth=document.body.clientWidth
    console.log(clientWidth)
    let fontSize =  clientWidth / 10 / 2
    // let fontSize = window.innerWidth / 10 / 2
    // 获取到的 fontSize 不允许超过我们定义的最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    let newFontSize = ''
    if (fontSize < MIN_FONT_SIZE) {
        // 定义根元素（html）fontSize 的大小 （rem）
        newFontSize = MIN_FONT_SIZE
    } else if (fontSize > MAX_FONT_SIZE) {
        // newFontSize = MAX_FONT_SIZE
        newFontSize = fontSize
    } else {
        newFontSize = fontSize
	}
	console.log(html)
    html.style.fontSize = newFontSize + 'px'

    return newFontSize
}
// 监听 html 文档被解析完成的事件
// document.addEventListener('DOMContentLoaded', () => {
//     // 获取 html 标签
//     const html = document.querySelector('html')

//     computedFontSize(html)
// })
