/*
 * params:{
 *   data:
 *   selectedValue:
 * }
 *
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
