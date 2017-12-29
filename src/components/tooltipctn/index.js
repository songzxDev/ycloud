import template from './index.html'
import ko from 'knockout'
import Base from '@/core/base'
class TooltipCtn extends Base {
  initialize (params) {
    this.title = params.title
    this.show = params.show || ko.observable(false)
    this.targetEl = params.targetEl
    this.left = ko.observable(0)
    this.right = ko.observable(0)
    this.top = ko.observable(0)
    this.position = params.position
    this.height = params.height || 0
  }
  computed (params) {
    this.cssPosition = 'y-tooltip-' + this.position
    this.style = ko.computed(() => {
      let style = {}
      if (this.left()) {
        style.left = this.left()
      }
      if (this.right()) {
        style.right = this.right()
      }
      style.top = this.top()
      style['transform-origin'] = 'center bottom 0px'
      return style
    })
  }
  subscribe (params) {
    this.show.subscribe(val => {
      // 多选情况比较复杂，暂不支持穿越overflowhidden
      let el = this.targetEl.children[0]
      let position = el.getBoundingClientRect()
      var width = el.offsetWidth
      // top topleft topright
      if (this.position.indexOf('top') === 0) {
        if (this.height) {
          this.top(position.top - el.offsetHeight * 1 - this.height + 'px')
        } else {
          this.top(position.top - el.offsetHeight * 3 + 'px')
        }
        // top right
        if (this.position.indexOf('right') > 0) {
          this.left((position.left - width * 3 / 4) + 'px')
        } else {
          this.left(position.left + 'px')
        }
      } else if (this.position.indexOf('bottom') === 0) {
        this.top(position.top + el.offsetHeight * 1.5 + 'px')
        if (this.position.indexOf('right') > 0) {
          this.left((position.left - width * 3 / 4) + 'px')
        } else {
          this.left(position.left + 'px')
        }
      }
    })
  }
}
export default {
  name: 'tooltipctn',
  init: Base.createViewModel(TooltipCtn),
  template
}
