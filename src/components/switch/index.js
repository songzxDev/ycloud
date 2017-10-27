/*
* author: ZJJ
* description: switch 组件
* 参数说明:
* @checked: ko对象 Boolean 类型
* @size: String类型:large, small (大, 小)
* */
import template from './index.html'
import ko from 'knockout'
function init (params) {
  var self = this
  const PREFIX = 'y-switch-' // 通用前缀
  this.checked = params.checked || ko.observable(false) // 请传入ko对象 Boolean 值
  this.size = params.size ? (PREFIX + params.size) : '' // 尺寸  String 类型
  this.sizeClass = ko.computed(() => {
    return self.checked() ? `${this.size} ${PREFIX}checked` : `${this.size} ${PREFIX}`
  }, this)
  this.checkSelect = function () {
    this.checked() ? this.checked(false) : this.checked(true)
  }
}
export default {
  name: 'switch',
  init,
  template
}
