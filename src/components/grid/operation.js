import template from './operation.html'
function init ({row, col, operationList}) {
  this.operationList = operationList
  this.row = row
  this.col = col
  this.operClick = (item, evt) => {
    item.click(this.row, evt)
  }
}

export default {
  name: 'grid-operation',
  init,
  template
}
