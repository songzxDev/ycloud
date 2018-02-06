/*
* author: ZJJ
* description: switch 组件
* 参数说明:
* @checked: ko对象 Boolean 类型
* @disabled: ko对象 Boolean 类型
* @size: String类型:large, small (大, 小)
* @checkedValue: 自定义选中状态的值
* @unCheckedValue: 自定义非选中状态的值
* @customChecked: 根据自定义选中值返回相应的值
* */
import template from './index.html'
import ko from 'knockout'
function init (params) {
  var self = this
  const PREFIX = 'y-switch-' // 通用前缀
  this.disabled = params.disabled ? params.disabled : ko.observable(false)
  this.checkedValue = params.checkedValue || null
  this.unCheckedValue = params.unCheckedValue || null
  this.customChecked = params.customChecked || ko.observable(false) // 请传入ko对象 Boolean 值
  // 如是customChecked，初始化选中状态
  this.checked = params.checked ? params.checked : params.customChecked() ? ko.observable(true) : ko.observable(false) // 请传入ko对象 Boolean 值
  this.checked.subscribe((val) => {
    if (this.checkedValue || this.unCheckedValue) {
      if (this.checkedValue && this.checked()) {
        this.customChecked(this.checkedValue)
      }
      if (!this.checkedValue && this.checked()) {
        this.customChecked(true)
      }
      if (this.unCheckedValue && !this.checked()) {
        this.customChecked(this.unCheckedValue)
      }
      if (!this.unCheckedValue && !this.checked()) {
        this.customChecked(false)
      }
    } else {
      this.customChecked(val)
    }
  })
  this.size = params.size ? (PREFIX + params.size) : '' // 尺寸  String 类型
  this.sizeClass = ko.computed(() => {
    return self.disabled() ? self.checked() ? `${this.size} ${PREFIX}checked ${PREFIX}disabled` : `${this.size} ${PREFIX}disabled` : self.checked() ? `${this.size} ${PREFIX}checked` : `${this.size} ${PREFIX}`
  }, this)
  this.checkSelect = function () {
    if (self.disabled()) {
      return false
    } else {
      this.checked() ? this.checked(false) : this.checked(true)
    }
  }
  // 初始化customChecked的返回值
  if (params.customChecked) {
    if (params.customChecked() && this.checkedValue) {
      this.customChecked(this.checkedValue)
    }
    if (!params.customChecked() && this.unCheckedValue) {
      this.customChecked(this.unCheckedValue)
    }
  }
}
export default {
  name: 'switch',
  init,
  template
}
