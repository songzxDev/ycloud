import template from './index.html'
import ko from 'knockout'
import Base from '../../core/base'
const _INTERGER = 'integer'
const _POSITIVEINTEGER = 'positiveinteger'
const _POSITIVENUMBER = 'positivenumber'
const _CUSTOMTYPELIST = [_INTERGER, _POSITIVEINTEGER, _POSITIVENUMBER]
// 判断是整数
const isInteger = function () {
  var val = this.$el.querySelector('input').value
  if (val !== '-' && (isNaN(val) || /\./g.test(val))) {
    val = val.replace(/[^\d]/g, '').replace(/-{2,}/g, '-')
    this.$el.querySelector('input').value = val
  }
  return val
}
// 判断是正整数
const isPositiveInteger = function () {
  var val = this.$el.querySelector('input').value
  if (isNaN(val) || /(\.|-)/g.test(val)) {
    val = val.replace(/[^\d]/g, '').replace(/-/g, '')
    this.$el.querySelector('input').value = val
  }
  if (val <= 0) {
    this.$el.querySelector('input').value = ''
  }
  return val
}
// 判断是正数
const isPositivenumber = function () {
  var val = this.$el.querySelector('input').value
  if (isNaN(val)) {
    val = val.replace(/[^\d]/g, '').replace(/-{2,}/g, '-')
    this.$el.querySelector('input').value = val
  }
  if (val <= 0) {
    this.$el.querySelector('input').value = val.replace(/-/g, '')
  }
  return val
}
class Input extends Base {
  initialize (params) {
    this.value = params.value
    this.placeholder = params.placeholder || ''
    this.prepend = params.prepend || false
    this.append = params.append || false
    // 是否支持可清楚
    this.clearable = params.clearable || false
    this.align = params.align || 'left'
    this.isHasForm = !!params.onSubmit
    this.handleSubmit = params.onSubmit || function () {}
    this.handleIconClick = params.onIconClick || function () {}
    this.iconClass = params.iconClass || ''
    this.ctnClass = params.class || ''
    this.disabled = params.disabled || ko.observable(false)
    this.typeList = ['text', 'textarea', 'password', 'url', 'email', 'date', 'number']
    this.maxlength = params.maxlength || 250
  }
  computed (params) {
    this.type = ko.computed(() => {
      if (params.type && this.typeList.indexOf(params.type) > -1) {
        return params.type
      } else {
        // 如果要求输入整数、正整数，正数
        return 'text'
      }
    })
    this.showIcon = ko.computed(() => {
      return this.iconClass.length > 0
    })
  }
  methods (params) {
    // 输入删除
    this.handleClose = () => {
      if (ko.isObservable(this.value)) {
        this.value('')
      } else {
        this.value = ''
      }
    }

    // 默认校验
    this.defaultValidate = (vm, e) => {
      if (_CUSTOMTYPELIST.indexOf(params.type) > -1) {
        switch (params.type) {
          case _INTERGER: return isInteger.call(this)
          case _POSITIVEINTEGER: return isPositiveInteger.call(this)
          case _POSITIVENUMBER: return isPositivenumber.call(this)
        }
      } else {
        return true
      }
    }
    this.onKeyup = params.onKeyup || function () {
      this.defaultValidate()
    }.bind(this)
    this.onChange = params.onChange || function () {}
    this.onInput = function (vm, e) {
      this.defaultValidate()
      params.onInput && params.onInput(e)
    }.bind(this)
    this.onBlur = params.onBlur || function () {}
    this.onFocus = params.onFocus || function () {}
    this.onClick = function () { return false }
  }
}
export default {
  name: 'input',
  init: Base.createViewModel(Input),
  template
}
