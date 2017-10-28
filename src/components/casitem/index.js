/*
 * params:{
 *   md: 4   // form-group一共占据几列 默认按照栅格化布局来 相当于设置样式u-col-4 不设置和md的效果一样
 *   sm: 3   // 相当于样式u-col-sm-3
 *   xs: 12  // 相当于设置u-col-xs-12
 *   lg: 6  //相当于设置u-col-lg-6
 * }
 *
 * */
import template from './index.html'
import ko from 'knockout'

function init (params) {
  this.subList = ko.observableArray([])
  this.data = params.data
  this.activeIndex = ko.observable(-1)
  this.selectedValue = params.selectedValue
  this.expandChild = (data, index) => {
    this.activeIndex(index)
    if (data.children) {
      this.subList(data.children)
    } else {
      this.subList([])
    }
    this.selectedValue(data)
  }
}
export default {
  name: 'casitem',
  init,
  template
}
