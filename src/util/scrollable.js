// 弹框时禁止滚动条滚动
function lockScrollEffect () {
  document.body.style.overflow = 'hidden'
}
function resetScrollEffect () {
  document.body.style.overflow = ''
}
export {
  lockScrollEffect,
  resetScrollEffect
}
