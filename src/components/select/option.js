import template from './option.html'
import ko from 'knockout'
function init (params) {
  this.value = params.value
  this.label = params.label || 'label'
  this.key = params.key || 'value'
  this.curIndex = params.curIndex
  this.index = params.index
  this.labelsecond = params.labelsecond || ''
  this.itemClick = (item, evt) => {
    params.itemClick(item, evt)
  }
  this.active = ko.observable()
  this.multiActive = ko.observable()
  this.curValue = params.curValue
  this.curValue.subscribe(item => {
    this.active(item === this.value.value)
  })
  params.curMultiValue.subscribe(items => {
    this.multiActive(items.indexOf(this.value) >= 0)
  })
}
export default {
  name: 'option',
  init,
  template
}
