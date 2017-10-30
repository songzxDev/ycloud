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
  this.casitmevisible = ko.observable(false)
  this.handleVisible = () => this.casitmevisible(true)
  this.handleClose = () => this.casitmevisible(false)
}
export default {
  name: 'cascader',
  init,
  template
}
