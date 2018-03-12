import ko from 'knockout'
import template from './index.html'
function initialize (params) {
  this.title = params.title
  this.vm = params.vm
  this.label = params.label
  this.labelStyle = params.labelStyle
  this.style = params.style
  this.animated = params.animated || ko.observable(false)
  // 外界动态改变动画效果
  this.classes = ko.computed(() => {
    if (this.animated && this.animated.subscribe) {
      return this.animated() ? 'slideInUp animated' : ''
    } else {
      return this.animated ? 'slideInUp animated' : ''
    }
  })
}
export default {
  name: 'boxcontent',
  init: initialize,
  template
}
