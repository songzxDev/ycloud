import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
function init (params) {
  this.isShow = params.isShow || ko.observable(false)
  this.style = ko.computed(() => {
    let style = {}
    if (params.width) {
      style.width = params.width + 'px'
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
export default {
  name: 'dropdown',
  init,
  template
}
