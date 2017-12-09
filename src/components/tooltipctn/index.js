import template from './index.html'
import ko from 'knockout'
import Base from '@/core/base'
class TooltipCtn extends Base {
  initialize (params) {
    this.title = params.title
    this.show = params.show || ko.observable(false)
    this.targetEl = params.targetEl
    this.left = ko.observable(0)
    this.top = ko.observable(0)
    this.position = params.position
    this.height = params.height || 0
  }
  computed (params) {
    this.style = ko.computed(() => {
      let style = {}
      style.left = this.left()
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
      if (this.position === 'top' || this.position === 'topleft') {
        if (this.height) {
          this.top(position.top - el.offsetHeight * .5 - this.height + 'px')
        } else {
          this.top(position.top - el.offsetHeight * 2.5 + 'px')
        }

        this.left(position.left + 'px')
      }
      if (this.position === 'bottom') {
        this.top(position.top + el.offsetHeight * 1.5 + 'px')
        this.left(position.left + 'px')
      }
    })
  }
}
export default {
  name: 'tooltipctn',
  init: Base.createViewModel(TooltipCtn),
  template
}
