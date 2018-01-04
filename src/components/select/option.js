import template from './option.html'
import ko from 'knockout'
function init (params) {
  this.value = params.value
  this.label = params.label || 'label'
  this.curIndex = params.curIndex
  this.index = params.index
  this.valuekey = params.valuekey || 'value'
  this.labelsecond = params.labelsecond || ''
  this.itemClick = (item, evt) => {
    params.itemClick(item, evt)
  }
  this.active = ko.observable()
  this.multiActive = ko.observable()
  this.curValue = params.curValue
  this.curValue.subscribe(item => {
    this.active(item === this.value[this.valuekey])
  })
  // 用valuekey判断 不能用整个item判断
  this.multiActive = ko.computed(() => {
    var keys = params.curMultiValue().map((item) => {
      return item[this.valuekey]
    })
    return keys.indexOf(this.value[this.valuekey]) >= 0
  })
}
export default {
  name: 'option',
  init,
  template
}
