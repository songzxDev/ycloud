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
      let contentHeight = 0
      let transformLeft = 0
      tabList.forEach((node, index) => {
        // 计算当前节点之前的宽度
        if (index < curIndex) {
          transformLeft += node.offsetWidth
        }
        // 计算当前节点的高度和宽度
        if (index === curIndex) {
          contentWidth = node.offsetWidth
          contentHeight = node.offsetHeight
        }
      })
      style.transform = `translateX(${transformLeft}px) translateY(${contentHeight}px) translateZ(0px)`
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
