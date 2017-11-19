import template from './operation.html'
import ko from 'knockout'
function init ({row, col, operationList}) {
  this.row = row
  this.col = col
  this.orginOperationList = ko.observableArray(operationList)
  this.operationList = ko.computed(() => {
    let list = []
    this.orginOperationList().forEach((operate) => {
      // 如果不设置visible则默认都显示
      if (!operate.visible) {
        list.push(operate)
      }
      // 如果设置visible 且visible方法返回true
      if (operate.visible && operate.visible(this.row)) {
        list.push(operate)
      }
    })
    return list
  })
  // 当数量大于3时，前两个操作
  this.quickList = ko.computed(() => {
    if (this.operationList().length > 3) {
      return this.operationList().slice(0, 2)
    } else {
      return []
    }
  })
  // 更多操作
  this.moreList = ko.computed(() => {
    if (this.operationList().length > 3) {
      return this.operationList().slice(2, this.operationList().length)
    } else {
      return []
    }
  })

  this.operClick = (item, evt) => {
    item.click(row, evt)
    var index = this.orginOperationList.indexOf(item)
    // 为了重新出发visible
    this.orginOperationList.splice(index, 1, item)
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
