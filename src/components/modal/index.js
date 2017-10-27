import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import {lockScrollEffect, resetScrollEffect} from '@/util/scrollable'
function init (params) {
  this.visible = params.visible || ko.observable(false)
  this.width = params.width || '400px'
  this.title = params.title || '提示'
  // 关闭事件
  this.handleClose = (data, event) => {
    const className = event.target.getAttribute('class')
    if (className && className.indexOf('modal-wrap') > -1) {
      this.visible(false)
    }
  }
  // 时间
  this.handleCancel = () => {
    this.visible(false)
  }
  this.visible.subscribe(val => {
    if (val) {
      lockScrollEffect()
    } else {
      resetScrollEffect()
    }
  })
}

export default {
  name: 'modal',
  init,
  template
}
