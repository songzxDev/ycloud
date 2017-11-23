import template from './radioitem.html'
import ko from 'knockout'
function init (params) {
  this.value = params.value
  this.currentValue = params.currentValue
  this.radioname = params.radioname
  this.checked = ko.computed(() => {
    // todo 默认是value/label 后续要改成其他自定义格式
    return this.currentValue() === this.value.value
  })
  this.change = (data) => {
    this.currentValue(this.value.value)
  }
}
export default {
  name: 'radio-item',
  init,
  template
}
