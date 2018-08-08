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
  this.stringValue = params.stringValue || ko.observable('')
  this.value.subscribe((val) => {
    if (this.stringValue) {
      const v = val.toString()
      // 当存在stringValue时 需要判断String值是否一样 防止多次触发
      if (v !== this.stringValue()) {
        this.stringValue(v)
      }
    }
  })
  var that = this
  this.stringValue.subscribe((val) => {
    if (val) {
      if (val !== this.value().toString()) {
        that.value(val.split(','))
      }
    } else {
      that.value([])
    }
  })
  this.direction = params.direction || 'horizontal'
}

export default {
  name: 'checkbox',
  init,
  template
}
