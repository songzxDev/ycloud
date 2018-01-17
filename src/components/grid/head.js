import template from './head.html'
import ko from 'knockout'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.columns1 = params.columns1 || ko.observableArray([])
  // 用于多行的rowspan
  this.columns2 = params.columns2 || ko.observableArray([])
  this.tableWidth = params.tableWidth
  this.allRowChecked = params.allRowChecked
  this.lockhead = params.lockhead
}

export default {
  name: 'grid-head',
  init,
  template
}
