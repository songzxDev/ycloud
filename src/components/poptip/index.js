/*
* @author: liuxu7
* @date: 2018-03-14
* @description: 气泡组件
* @type: custom/default
* @position ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']
* */
import template from './index.html'
import ko from 'knockout'
import Base from '@/core/base'
import Popper from 'popper.js'
import $ from 'jquery'
class Poptip extends Base {
  initialize (params) {
    this.title = params.title || ''
    this.question = params.question || false
    this.position = params.position || 'top'
    this.trigger = params.trigger || 'hover'
    this.visible = ko.observable(0)
    let reg = /(top)|(right)|(bottom)|(left)/g
    this.thisClass = 'y-poptip-' + this.position.match(reg)
    if (this.position.indexOf('-') > -1) {
      this.thisClass += ' y-poptip-' + this.position
    }
  }
  methods () {
    this.handleClick = () => {}
    this.handleHover = () => {}
    function handleVisible () {
      this.visible(Number(!this.visible()))
    }
    if (this.trigger === 'click') {
      this.handleClick = handleVisible
    } else {
      this.handleHover = handleVisible
    }
  }
  computed () {
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
  subscribe (params) {
    /* eslint-disable no-new */
    /* 声明变量myPopper会存在内存中 */
    this.visible.subscribe(val => {
      if (!this.myPopper && val) {
        let reference = $(this.$el).find('.element')
        let popper = $(this.$el).find('.y-poptip-ctn')
        this.myPopper = new Popper(
          reference,
          popper,
          {
            placement: this.position,
            onCreate: (data) => {},
            onUpdate: (data) => {},
            positionFixed: true
          }
        )
      } else {
        this.myPopper && this.myPopper.update()
      }
    })
  }
}
export default {
  name: 'poptip',
  init: Base.createViewModel(Poptip),
  template
}
