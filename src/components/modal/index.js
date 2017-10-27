import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
// 弹框时禁止滚动条滚动
function addScrollEffect () {
  document.body.style.overflow = 'hidden'
}
function removeScrollEffect () {
  document.body.style.overflow = ''
}
function init (params) {
  this.visible = params.visible || ko.observable(false)
  this.width = params.width || '400px'
  this.title = params.title || '提示'
  this.handleClose = (data, event) => {
    const className = event.target.getAttribute('class')
    if (className && className.indexOf('modal-wrap') > -1) {
      this.visible(false)
    }
  }
  this.visible.subscribe(val => {
    if (val) {
      addScrollEffect()
    } else {
      removeScrollEffect()
    }
  })
}

export default {
  name: 'modal',
  init,
  template
}
