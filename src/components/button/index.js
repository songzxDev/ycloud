/*
* @author: liuxu7
* @date: 2017-10-25
* @description: 按钮组件
* type: primary/ghost/dashed/text/info/success/warning/error
* size: large/small/default
* shape: circle
* btnType: 原生button属性 + a
* disabled: true/false
* loading: true/false
* */
import template from './index.html'
import ko from 'knockout'
import _ from '@/util/lodash'

function init (params) {
  const PREFIX = 'y-button-'
  // button
  let defaultFun = function () {}
  this.type = params.type ? (PREFIX + params.type) : ''
  this.size = params.size ? (PREFIX + params.size) : ''
  this.shape = params.shape ? (PREFIX + params.shape) : ''
  this.classes = ko.computed(() => {
    return `${this.type} ${this.size} ${this.shape}`
  })
  this.btnType = params.btnType || 'button'
  this.disabled = params.disabled || ko.observable(false)
  this.loading = params.loading || ko.observable(false)
  this.loadingText = params.loadingText || 'loading..'
  this.handleClick = params.click || defaultFun
  this.handleReClick = _.debounce(() => {
    this.handleClick()
    this.disabled(true)
    setTimeout(() => {
      this.disabled(false)
    }, params.wait || 0)
  }, params.wait || 0, {'leading': true})

  // a target
  this.url = params.url || 'javascript:;'
  if (params.rootPath) {
    this.url = 'http://' + this.url
  }
  this.target = params.target || '_self'
}
export default {
  name: 'button',
  init,
  template
}
