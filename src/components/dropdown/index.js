import template from './index.html'
import ko from 'knockout'
import $ from 'jquery'
import 'ko-bindinghandler'
function _init (params, el) {
  this.isShow = params.isShow || ko.observable(false)
  this.scrollTop = params.scrollTop || ko.observable()
  let _el = el.element
  this.scrollTop.subscribe(val => {
    _el.children[0].scrollTop = val
  })
  this.targetEl = params.targetEl
  this.top = ko.observable()
  this.left = ko.observable()
  this.width = ko.observable(params.width || '100%')
  // 切换时重新设置下拉的未知
  this.isShow.subscribe(val => {
    if (val) {
      let el = this.targetEl.children[0]
      let position = el.getBoundingClientRect()
      if (!params.width) {
        this.width($(el).width())
      }
      this.left(position.left)
      // select 默认高度 + 32
      this.top(position.top + 32)
    }
  })
  this.style = ko.computed(() => {
    let style = {}
    // width 支持ko和非ko对象
    if (this.width && this.width.subscribe) {
      // 存在传入 100%的情况
      if (isNaN(this.width())) {
        style.width = this.width()
      } else {
        style.width = this.width() + 'px'
      }
    }
    if (params.maxHeight) {
      style.maxHeight = params.maxHeight + 'px'
    }
    if (params.overflow) {
      style.overflow = params.overflow
    }
    if (this.top()) {
      style.top = this.top() + 'px'
      style.left = this.left() + 'px'
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
