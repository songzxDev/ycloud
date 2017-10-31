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
    if (params.valueList.indexOf(this.value) >= 0) {
      this.checked(true)
    } else {
      this.checked(false)
    }
  })
  this.change = (data) => {
    if (data.checked()) {
      params.valueList.push(this.value)
    } else {
      let index = params.valueList.indexOf(this.value)
      params.valueList.splice(index, 1)
    }
  }
}
export default {
  name: 'checkbox-item',
  init,
  template
}
