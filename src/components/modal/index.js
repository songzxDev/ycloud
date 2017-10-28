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
  this.handleOk = (data, event) => {
    if (this.isValidate) {
      this.errormsg('')
      this.visible(false)
      if (params.ok) {
        params.ok(data)
      }
    } else {
      this.errormsg(params.errormsg || '校验失败！')
    }
  }
  this.visible.subscribe(val => {
    if (val) {
      lockScrollEffect()
    } else {
      resetScrollEffect()
    }
  })
  // 添加外层错误校验
  this.errormsg = ko.observable('')
  this.isValidate = true
  this.onModalOkValidate = function (validateResult) {
    if (validateResult) {
      this.isValidate = true
    } else {
      this.isValidate = false
    }
  }.bind(this)
}

export default {
  name: 'modal',
  init,
  template
}
