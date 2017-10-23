import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import option from './option'
const PREFIX = 'y-'
ko.components.register(PREFIX + option.name, {
  viewModel: option.init,
  template: option.template
})
function init (params) {
  this.value = ko.observable()
  this.selectedLabel = ko.observable()
  this.filterable = ko.observable(params.filterable || false)
  this.multiple = params.multiple || false
  this.width = ko.observable()
  this.showDropdown = ko.observable(false)
  this.dataList = params.dataList
  this.handleShowDrop = () => {
    this.showDropdown(true)
  }
  this.clickoutside = () => {
    this.showDropdown(false)
  }
  this.handleOptClick = (item, evt) => {
    this.selectedLabel(item.value[item.label])
    if (!this.multiple) {
      this.showDropdown(false)
    }
  }
}
export default {
  name: 'select',
  init,
  template
}
