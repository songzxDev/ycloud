/*
* author: ZJJ
* description: switch 组件
* 参数说明:
* @checked2: ko对象 Boolean 类型(组件内控制显示的值)
* @disabled: ko对象 Boolean 类型
* @size: String类型:large, small (大, 小)
* @checkedValue: 自定义选中状态的值
* @unCheckedValue: 自定义非选中状态的值
* @checked: 根据自定义选中值返回相应的值(组件输入和返回的值)
* */
import template from './index.html'
import ko from 'knockout'
function init (params) {
  var self = this
  const PREFIX = 'y-switch-' // 通用前缀
  this.disabled = params.disabled ? params.disabled : ko.observable(false)
  this.checkedValue = params.checkedValue || null
  this.unCheckedValue = params.unCheckedValue || null
  this.checked = params.checked || ko.observable(false) // 请传入ko对象 Boolean 值
  // 初始化选中状态
  this.checked2 = params.checked2 ? params.checked2 : params.checked() ? ko.observable(true) : ko.observable(false) // 请传入ko对象 Boolean 值
  this.checked2.subscribe((val) => {
    if (this.checkedValue || this.unCheckedValue) {
      if (this.checkedValue && this.checked2()) {
        this.checked(this.checkedValue)
      }
      if (!this.checkedValue && this.checked2()) {
        this.checked(true)
      }
      if (this.unCheckedValue && !this.checked2()) {
        this.checked(this.unCheckedValue)
      }
      if (!this.unCheckedValue && !this.checked2()) {
        this.checked(false)
      }
    } else {
      this.checked(val)
    }
  })
  this.size = params.size ? (PREFIX + params.size) : '' // 尺寸  String 类型
  this.sizeClass = ko.computed(() => {
    return self.disabled() ? self.checked2() ? `${this.size} ${PREFIX}checked ${PREFIX}disabled` : `${this.size} ${PREFIX}disabled` : self.checked2() ? `${this.size} ${PREFIX}checked` : `${this.size} ${PREFIX}`
  }, this)
  this.checkSelect = function () {
    if (self.disabled()) {
      return false
    } else {
      this.checked2() ? this.checked2(false) : this.checked2(true)
    }
  }
  // 初始化checked的返回值
  if (params.checked) {
    if (params.checked() && this.checkedValue) {
      this.checked(this.checkedValue)
    }
    if (!params.checked() && this.unCheckedValue) {
      this.checked(this.unCheckedValue)
    }
  }
}
export default {
  name: 'switch',
  init,
  template
}
