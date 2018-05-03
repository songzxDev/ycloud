import template from './index.html'
import Base from '../../core/base'
import ko from 'knockout'
class StateTab extends Base {
  initialize (params) {
    this.items = params.items
    this.index = params.index
    this.style = params.style || {}
    this.hideNum = params.hideNum || false
    this.stateActiveStyle = ko.observable()
  }
  subscribe (params) {
    // 索引改变需要重新计算active样式
    this.index.subscribe(val => {
      this.computedStyle()
    })
  }
  methods (params) {
    this.handler = (msg, _index) => {
      this.index(_index)
      params.handler(msg)
    }
    this.computedStyle = () => {
      let curIndex = this.index()
      let el = params.$el
      let tabList = el.querySelectorAll('.y-state-tab')
      let style = {}
      let contentWidth = 0
      let transformLeft = 0
      if (curIndex >= 0 && curIndex < tabList.length) {
        let curNode = tabList[curIndex]
        transformLeft = curNode.offsetLeft
        contentWidth = curNode.offsetWidth
      }
      style.transform = `translateX(${transformLeft}px) translateZ(0px)`
      style.width = contentWidth + 'px'
      this.stateActiveStyle(style)
    }
  }
  created (params) {
    // 渲染完先重新计算一遍
    setTimeout(() => {
      this.computedStyle()
    })
  }
}
export default {
  name: 'state-tabs',
  init: Base.createViewModel(StateTab),
  template
}
