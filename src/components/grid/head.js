import template from './head.html'
import ko from 'knockout'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.columns1 = params.columns1 || ko.observableArray([])
  // 用于多行的rowspan
  this.columns2 = params.columns2 || ko.observableArray([])
  this.tableWidth = params.tableWidth
  this.outterWidth = ko.observable()
  if (params.lockhead) {
    setTimeout(function () {
      if (params.el) {
        var width = params.el.firstElementChild.offsetWidth
        // 对于在modal中的grid需要特殊处理
        if (width > 0) {
          this.outterWidth(width + 'px')
        } else {
          this.outterWidth('100%')
        }
      }
    }.bind(this))
  }
  this.allRowChecked = params.allRowChecked
  this.lockhead = params.lockhead
  this.headtransform = params.headtransform
}

export default {
  name: 'grid-head',
  init,
  template
}
