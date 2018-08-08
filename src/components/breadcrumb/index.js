/*
* @author: wangk2
* @date: 2018-02-01
* @description: 面包屑组件
*
* */
import template from './index.html'
import ko from 'knockout'

function init (params) {
  this.data = params.data
  this.separator = params.separator || '>'
  var _data = ko.utils.unwrapObservable(this.data)
  this.lastRow = _data[_data.length - 1]
  this.exceptLastRowArr = _data.slice(0, _data.length - 1)
}
export default {
  name: 'breadcrumb',
  init,
  template
}
