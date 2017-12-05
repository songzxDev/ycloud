import template from './checkboxitem.html'
import ko from 'knockout'
function init (params) {
  this.label = params.label
  this.value = params.value
  this.checked = params.checked || ko.observable(false)
  params.valueList = params.valueList || []
  if (params.valueList.indexOf(this.value) >= 0) {
    this.checked(true)
  }
  params.valueList.subscribe && params.valueList.subscribe(val => {
    if (val.indexOf(this.value) >= 0) {
      this.checked(true)
    } else {
      this.checked(false)
    }
  })
  this.checked.subscribe(val => {
    let index = params.valueList.indexOf(this.value)
    if (index < 0 && val) {
      params.valueList.push(this.value)
    } else if (!val && index >= 0) {
      params.valueList.splice(index, 1)
    }
  })
  // checkbox重构，不和input进行绑定，在modal+checkbox-grid场景 全选始终无法选中，
  // 于是干脆不绑定了，直接用 试一下
  this.hanldeClick = (data, event) => {
    data.checked(!data.checked())
  }
}
export default {
  name: 'checkbox-item',
  init,
  template
}
