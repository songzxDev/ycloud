import template from './index.html'
import tooltipctn from '../tooltipctn'
import ko from 'knockout'
import Base from '@/core/base'
const PREFIX = 'y-'
ko.components.register(PREFIX + tooltipctn.name, {
  viewModel: tooltipctn.init,
  template: tooltipctn.template
})
class Tooltip extends Base {
  initialize (params) {
    this.title = params.title
    this.class = params.class
    this.isShow = ko.observable(false)
    this.position = params.position || 'top'
  }
  computed () {
    // 是否使用自己内部的tooltipctn
    this.isSelfCustom = ko.computed(() => {
      return true
    })
    this.hasMarkup = ko.computed(() => {
      if (this.$templateNodes.length > 0) {
        let nodeList = this.$templateNodes.filter((node) => {
          return node.nodeName !== '#text' && node.nodeName !== '#comment'
        })
        return nodeList.length > 0
      } else {
        return false
      }
    })
  }
  methods (params) {
    this.handleHover = () => {
      this.isShow(true)
    }
    this.handleLeave = () => {
      this.isShow(false)
    }
  }
}

export default {
  name: 'tooltip',
  init: Base.createViewModel(Tooltip),
  template
}
