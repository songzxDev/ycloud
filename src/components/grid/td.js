import template from './td.html'
import ko from 'knockout'
import operation from './operation'
const PREFIX = 'y-'
ko.components.register(PREFIX + operation.name, {
  viewModel: operation.init,
  template: operation.template
})
function removeZero (num) {
  if (isNaN(num)) {
    return num
  }
  let result = Number(num)
  return result
}
// 数字转成千分位
function toThousands (num) {
  if (isNaN(num)) {
    return num
  }
  num = (num || 0).toString()
  let result = ''
  let nums = num.split('.')
  // 整数部分
  let integerPart = nums[0]
  // 小数部分
  let decimalPart = nums.length > 1 ? nums[1] : 0
  while (integerPart.length > 3) {
    result = ',' + integerPart.slice(-3) + result
    integerPart = integerPart.slice(0, integerPart.length - 3)
  }
  if (integerPart) { result = integerPart + result }
  if (Number(decimalPart)) {
    // 末位去零
    result += '.' + Number('0.' + decimalPart).toString().split('.')[1]
  }
  return result
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
        }
      } else if (this.col.dataType === 'datetime') {
        if (result) {
          result = new Date(result)._format('yyyy-MM-dd hh:mm:ss')
        }
      } else if (this.col.dataType === 'financial') { // 财务数字
        if (result) {
          result = toThousands(result)
        }
      } else if (this.col.dataType === 'removeZero') { // 金额 单价类（自动末位0去掉，是几位小数就按几位小数显示）
        if (result) {
          result = removeZero(result)
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
