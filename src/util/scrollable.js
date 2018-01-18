
// 弹框时禁止滚动条滚动
function hasScroll () {
  return document.body.style.overflow !== 'hidden' &&
    document.body.scroll !== 'no' &&
    document.body.scrollHeight > document.body.offsetHeight
}
const scorllWidth = window.innerWidth - document.body.clientWidth
var locked = false
function lockScrollEffect () {
  // 如果有滚动条
  if (hasScroll()) {
    locked = true
    document.body.style.overflow = 'hidden'
    // fix #24 select展开后会闪烁
    document.body.style.marginRight = scorllWidth > 0 ? scorllWidth + 'px' : '15px'
  }
}
function resetScrollEffect () {
  if (locked) {
    locked = false
    document.body.style.overflow = ''
    // fix #24 select展开后会闪烁
    document.body.style.marginRight = 0
  }
}
export {
  lockScrollEffect,
  resetScrollEffect
}
