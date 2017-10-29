import template from './head.html'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
}

export default {
  name: 'grid-head',
  init,
  template
}
