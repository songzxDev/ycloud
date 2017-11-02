import template from './operation.html'
function init ({row, col, operationList}) {
  this.operationList = operationList
  this.row = row
  this.col = col
  this.operClick = (item, evt) => {
    item.click(row, evt)
    var index = this.operationList.indexOf(item)
    // 为了重新出发visible
    this.operationList.splice(index, 1, item)
  }
  this.visible = (item) => {
    if (item.visible) {
      return item.visible(row)
    } else {
      return true
    }
  }
}

export default {
  name: 'grid-operation',
  init,
  template
}
