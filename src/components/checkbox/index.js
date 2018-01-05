import template from './index.html'
import ko from 'knockout'
import item from './checkboxitem'
const PREFIX = 'y-'
ko.components.register(PREFIX + item.name, {
  viewModel: item.init,
  template: item.template
})
function init (params) {
  if (params.dataList && params.dataList.subscribe) {
    this.dataList = params.dataList
  } else {
    this.dataList = ko.observableArray(params.dataList || [])
  }

  this.value = params.value || ko.observableArray([])
  this.stringValue = params.stringValue
  this.value.subscribe((val) => {
    if (this.stringValue) {
      this.stringValue(val.toString())
    }
  })
  this.direction = params.direction || 'horizontal'
}

export default {
  name: 'checkbox',
  init,
  template
}
