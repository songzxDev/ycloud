import template from './td.html'
import ko from 'knockout'
import operation from './operation'
const PREFIX = 'y-'
ko.components.register(PREFIX + operation.name, {
  viewModel: operation.init,
  template: operation.template
})
// 数字转成千分位
function toThousands(num) {
  if (isNaN(num)) {
    return num
  }
  num = (num || 0).toString()
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}
// 判断点击事件是否触发行选中
function init (params) {
  // 为跨页选择做准备
  // let cacheData = []
  this.isDataTable = params.isDataTable
  this.row = params.row
  this.col = params.col
  this.colIndex = params.colIndex.subscribe ? params.colIndex() : params.colIndex
  this.rowIndex = params.rowIndex.subscribe ? params.rowIndex() : params.rowIndex
  this.forbitRowSelectFn = params.forbitRowSelectFn || function () { return false }
  // 默认的数据格式化 支持date和datetime
  this.defaultFormatText = ko.computed(() => {
    let result
    if (this.isDataTable && params.col.field) {
      result = params.row.ref(params.col.field)() // 使用ko属性数值改变才能被监听到
    } else {
      result = params.row[params.col.field]
    }
    if (this.col.dataType) {
      if (this.col.dataType === 'date') {
        if (result) {
          result = new Date(result)._format('yyyy-MM-dd')
        } else if (this.col.dataType === 'datetime') {
          if (result) {
            result = new Date(result)._format('yyyy-MM-dd hh:mm:ss')
          }
        } else if (this.col.dataType === 'financial') { // 财务数字
          if (result) {
            result = toThousands(result)
          }
        }
      }
    }
    return result
  })
}

export default {
  name: 'grid-td',
  init,
  template
}
