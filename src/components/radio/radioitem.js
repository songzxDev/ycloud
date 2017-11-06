import template from './radioitem.html'
import ko from 'knockout'
function init (params) {
  this.value = params.value
  this.currentValue = params.currentValue
  this.radioname = params.radioname
  this.checked = ko.computed(() => {
    return this.currentValue() === this.value
  })
  this.change = (data) => {
    this.currentValue(this.value)
  }
}
export default {
  name: 'radio-item',
  init,
  template
}
