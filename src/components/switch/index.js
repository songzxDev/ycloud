/*
* author: ZJJ
* description: switch 组件
* 参数说明:
* @checked: ko对象 Boolean 类型
* @disabled: ko对象 Boolean 类型
* @size: String类型:large, small (大, 小)
* */
import template from './index.html'
import ko from 'knockout'
function init (params) {
  var self = this
  const PREFIX = 'y-switch-' // 通用前缀
  this.disabled = params.disabled ? params.disabled : ko.observable(false)
  this.checked = params.checked || ko.observable(false) // 请传入ko对象 Boolean 值
  this.size = params.size ? (PREFIX + params.size) : '' // 尺寸  String 类型
  this.stringChecked = params.checked ? '1' : '0' // 返回值  String 类型
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
}
export default {
  name: 'switch',
  init,
  template
}
