/*
* author: ZJJ
* description: switch 组件
* 参数说明:
* @checkedInside: ko对象 Boolean 类型(组件内控制显示的值)
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
  this.checkedValue = params.checkedValue ? params.checkedValue : true
  this.unCheckedValue = params.unCheckedValue ? params.unCheckedValue : false
  this.checked = params.checked || ko.observable(false) // 请传入ko对象 Boolean 值
  this.checkedInside = ko.observable()
  this.checkedInside.subscribe((val) => {
    if (val) {
      this.checked(this.checkedValue)
    } else {
      this.checked(this.unCheckedValue)
    }
  })
  this.checked.subscribe((val) => {
    if (val === this.checkedValue) {
      this.checkedInside(true)
    }
    if (val === this.unCheckedValue) {
      this.checkedInside(false)
    }
  })
  this.size = params.size ? (PREFIX + params.size) : '' // 尺寸  String 类型
  this.sizeClass = ko.computed(() => {
    return self.disabled() ? self.checkedInside() ? `${this.size} ${PREFIX}checked ${PREFIX}disabled` : `${this.size} ${PREFIX}disabled` : self.checkedInside() ? `${this.size} ${PREFIX}checked` : `${this.size} ${PREFIX}`
  }, this)
  this.checkSelect = function () {
    if (self.disabled()) {
      return false
    } else {
      this.checkedInside(!this.checkedInside())
    }
  }
  // 初始化checked的返回值
  if (this.checked() === this.checkedValue) {
    this.checkedInside(true)
  } else {
    this.checkedInside(false)
  }
}

export default {
  name: 'switch',
  init,
  template
}
