import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.type = params.type || 'text'
  this.value = params.value
  this.placeholder = params.placeholder || ''
  // 是否支持可清楚
  this.clearable = params.clearable || false
  this.isHasForm = !!params.onSubmit
  this.handleSubmit = params.onSubmit || function () {}
  this.handleIconClick = params.onIconClick || function () {}
  this.iconClass = params.iconClass || ''
  this.ctnClass = params.class || ''
  this.onChange = params.onChange || function () {}
  this.onInput = params.onInput || function () {}
  this.onBlur = params.onBlur || function () {}
  this.onFocus = params.onFocus || function () {}
  this.onClick = function () { return false }
  this.disabled = params.disabled || ko.observable(false)
  this.showIcon = ko.computed(() => {
    return this.iconClass.length > 0
  })
  // 输入删除
  this.handleClose = () => {
    if (ko.isObservable(this.value)) {
      this.value('')
    } else {
      this.value = ''
    }
  }
}

export default {
  name: 'input',
  init,
  template
}
