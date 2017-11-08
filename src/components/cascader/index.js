/*
* @author: songhlc liuxu7
* @date: 2017-10-25
* @description: 级联列表组件
* data:
* selectedValue:
* */
import template from './index.html'
import ko from 'knockout'

function init (params) {
  this.data = params.data
  this.selectedValue = params.selectedValue
  this.hidden = ko.observable(true)
  this.casitmevisible = ko.observable(false)
  this.casitmevisible.subscribe((val) => {
    if (val) {
      this.hidden(!val)
    } else {
      setTimeout(() => {
        this.hidden(!val)
      }, 500)
    }
  })
  this.clearable = params.clearable || false
  // 用于判断是否显示关闭按钮
  this.showCloseIcon = ko.computed(() => {
    return this.clearable && this.selectedValue().id
  })
  this.handlerClear = (e) => {
    window.event ? window.event.cancelBubble = true : e.stopPropagation()
    let obj = {}
    for (let key in this.selectedValue()) {
      obj[key] = ''
    }
    this.selectedValue(obj)
  }
  this.handleVisible = () => this.casitmevisible(true)
  this.handleClose = () => this.casitmevisible(false)
}
export default {
  name: 'cascader',
  init,
  template
}
