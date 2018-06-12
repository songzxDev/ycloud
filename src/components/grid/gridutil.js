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
var util = {
  defaultFormatText: (row, col) => {
    let result
    if (typeof row.ref === 'function' && col.field) {
      result = row.ref(col.field)() // 使用ko属性数值改变才能被监听到
    } else {
      result = row[col.field]
    }
    if (col.dataType) {
      if (col.dataType === 'date') {
        if (result) {
          result = new Date(result)._format('yyyy-MM-dd')
        }
      } else if (col.dataType === 'datetime') {
        if (result) {
          result = new Date(result)._format('yyyy-MM-dd hh:mm:ss')
        }
      } else if (col.dataType === 'financial') { // 财务数字
        if (result) {
          result = toThousands(result)
        }
      } else if (col.dataType === 'removeZero') { // 金额 单价类（自动末位0去掉，是几位小数就按几位小数显示）
        if (result) {
          result = removeZero(result)
        }
      }
    }
    return result
  }
}
export default util
