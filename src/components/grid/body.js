import template from './body.html'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.rows = params.rows
}

export default {
  name: 'grid-body',
  init,
  template
}
