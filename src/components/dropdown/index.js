import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
function _init (params, el) {
  this.isShow = params.isShow || ko.observable(false)
  this.scrollTop = params.scrollTop || ko.observable()
  let _el = el.element
  this.scrollTop.subscribe(val => {
    _el.children[0].scrollTop = val
  })
  this.style = ko.computed(() => {
    let style = {}
    if (params.width) {
      // 存在传入 100%的情况
      if (isNaN(params.width)) {
        style.width = params.width
      } else {
        style.width = params.width + 'px'
      }
    }
    if (params.maxHeight) {
      style.maxHeight = params.maxHeight + 'px'
    }
    if (params.overflow) {
      style.overflow = params.overflow
    }
    return style
  })
  this.animated = ko.observable(false)
  this.isShow.subscribe(val => {
    this.animated(true)
    setTimeout(() => {
      this.animated(false)
    }, 1500)
  })
}
var init = {
  createViewModel: function (params, componentInfo) {
    return new _init(params, componentInfo)
  }
}
export default {
  name: 'dropdown',
  init,
  template
}
