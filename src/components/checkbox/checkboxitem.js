import template from './checkboxitem.html'
import ko from 'knockout'
function init (params) {
  this.label = params.label
  this.disabled = params.disabled || ko.observable(false)
  this.secondarylabel = params.secondarylabel || ''
  this.value = params.value
  this.checked = params.checked || ko.observable(false)
  this.falseValue = params.falseValue || false
  this.clickBubble = !!params.clickBubble
  this.trueValue = params.trueValue ? params.trueValue : true
  params.valueList = params.valueList || []
  if (params.valueList.indexOf(this.value) >= 0) {
    this.checked(this.trueValue)
  }
  params.valueList.subscribe && params.valueList.subscribe(val => {
    // 统一需要转成字符串来判断
    var stringArray = val.map((item) => {
      return item ? (item + '') : ''
    })
    // 统一用string来判断
    if (stringArray.indexOf(this.value + '') >= 0) {
      this.checked(this.trueValue)
    } else {
      this.checked(this.falseValue)
    }
  })
  this.checked.subscribe(val => {
    // 统一需要转成字符串来判断
    var stringArray = ko.isObservable(params.valueList) ? params.valueList().map((item) => {
      return item ? (item + '') : ''
    }) : []
    let index = stringArray.indexOf(this.value + '')
    if (index < 0 && val) {
      params.valueList.push(this.value)
    } else if (!val && index >= 0) {
      params.valueList.splice(index, 1)
    }
  })
  // checkbox重构，不和input进行绑定，在modal+checkbox-grid场景 全选始终无法选中，
  // 于是干脆不绑定了，直接用 试一下
  this.hanldeClick = (data, event) => {
    if (data.checked() === this.trueValue) {
      data.checked(this.falseValue)
    } else {
      data.checked(this.trueValue)
    }
  }
}
export default {
  name: 'checkbox-item',
  init,
  template
}
