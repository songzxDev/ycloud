/*
* @author: liuxu7
* @date: 2017-10-25
* @description: 按钮组件
* type: primary/ghost/dashed/text/info/success/warning/error
* size: large/small/default
* shape: circle
* */
import template from './index.html'
import ko from 'knockout'

function init (params) {
  debugger
  const PREFIX = 'yc-button-'
  // 样式
  this.type = (PREFIX + params.type) || ''
  this.size = (PREFIX + params.size) || ''
  this.shape = (PREFIX + params.shape) || ''
  this.classes = ko.computed(() => {
    return `${this.type} ${this.size} ${this.shape}`
  })
  // 属性
  this.btnType = params.btnType || ''
  // 动态的
  this.disabled = params.disabled || ko.observable(false)
  this.loading = params.loading || ko.observable(false)
  // 点击事件
  this.click = params.click || ''
}
export default {
  name: 'button',
  init,
  template
}
