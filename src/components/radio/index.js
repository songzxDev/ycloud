import template from './index.html'
import ko from 'knockout'
import item from './radioitem'
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
  this.value = params.value || ko.observable()
  this.direction = params.direction || 'horizontal'
  this.radioname = 'y-radio' + Math.random()
}

export default {
  name: 'radio',
  init,
  template
}
