import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.type = params.type || 'text'
  this.value = params.value
  this.placeholder = params.placeholder || ''
  this.handleSubmit = params.onSubmit || function () {}
  this.handleIconClick = params.onIconClick || function () {}
  this.iconClass = params.iconClass || ''
  this.ctnClass = params.class || ''
  this.showIcon = ko.computed(() => {
    return this.iconClass.length > 0
  })
}

export default {
  name: 'input',
  init,
  template
}
