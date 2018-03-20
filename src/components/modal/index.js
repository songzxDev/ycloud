import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import {lockScrollEffect, resetScrollEffect} from '@/util/scrollable'
function init (params) {
  this.addtionButton = params.textClear || false
  this.visible = params.visible || ko.observable(false)
  this.textOk = params.textOk || '确定'
  this.textCancel = params.textCancel || '取消'
  this.textClear = params.textClear || '清空'
  this.isShow = ko.observable(false)
  this.width = params.width || '400px'
  this.title = params.title || '提示'
  this.isNotLazy = params.lazy === undefined ? false : !params.lazy
  this.top = window.innerHeight * 0.06 + 'px'
  var headAndFootHeightRate = (43 + 57) / window.innerHeight
  // 容器最大高度等于 屏幕可视高度 - 头部 - 尾部 - 内存padding - 距离顶部距离10% - 距离底部最小距离10%
  this.bodyMaxHeight = window.innerHeight * (1 - 0.12 - headAndFootHeightRate) + 'px'
  // 关闭事件
  this.handleClose = (data, event) => {
    const className = event.target.getAttribute('class')
    if (className && className.indexOf('modal-wrap') > -1) {
      this.visible(false)
    }
    return true
  }
  this.validateFn = params.validateFn || function () { return true }
  // 时间
  this.handleCancel = () => {
    this.visible(false)
  }
  this.handleClear = function (data, event) {
    if (params.handleClear) {
      params.handleClear(data, event)
    }
  }
  this.handleOk = (data, event) => {
    if (this.isValidate && this.validateFn()) {
      this.errormsg('')
      this.visible(false)
      if (params.ok) {
        params.ok(data, event)
      }
    } else {
      this.errormsg(params.errormsg || '校验失败！')
    }
  }
  this.visible.subscribe(function (val) {
    if (val) {
      lockScrollEffect()
    } else {
      resetScrollEffect()
    }
  })
  // 仅当visible第一次是true的时候切换if
  if (this.isNotLazy) {
    this.isShow(true)
  } else {
    ko.when(() => {
      return this.visible()
    }, () => {
      this.isShow(true)
    }, this)
  }

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
