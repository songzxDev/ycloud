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
    this.handleVisible = () => {}
    if (this.trigger === 'click') {
      this.handleVisible = () => {
        if (this.visible()) {
          this.visible(0)
        } else {
          this.visible(1)
        }
      }
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
  created () {
    setTimeout(() => {
      let reference = $(this.$el).find('.element')
      let popper = $(this.$el).find('.y-poptip-ctn')
      /* eslint-disable no-new */
      new Popper(
        reference,
        popper,
        {
          placement: this.position,
          onCreate: (data) => {},
          onUpdate: (data) => {},
          modifiers: {
            flip: {
              behavior: ['left', 'bottom', 'top']
            }
          }
        }
      )
    })
  }
}
export default {
  name: 'poptip',
  init: Base.createViewModel(Poptip),
  template
}
