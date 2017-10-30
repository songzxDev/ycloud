import template from './body.html'
import ko from 'knockout'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  params.rows().forEach(function (row) {
    row._hover = ko.observable(false)
  })
  this.rows = params.rows
  this.handleMouseIn = (row) => {
    if (row._hover()) return
    row._hover(true)
  }
  this.handleMouseOut = (row) => {
    row._hover(false)
  }
}

export default {
  name: 'grid-body',
  init,
  template
}
