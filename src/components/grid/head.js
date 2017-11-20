import template from './head.html'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.tableWidth = params.tableWidth
  this.allRowChecked = params.allRowChecked
  this.lockhead = params.lockhead
}

export default {
  name: 'grid-head',
  init,
  template
}
