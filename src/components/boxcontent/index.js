import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.title = params.title
  this.vm = params.vm
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
  init,
  template
}
