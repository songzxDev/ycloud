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
  if (ko.isObservable(this.data)) {
    this.lastRow = this.data()[this.data().length - 1]
    this.exceptLastRowArr = this.data().slice(0, this.data.length - 1)
  } else {
    this.lastRow = this.data[this.data.length - 1]
    this.exceptLastRowArr = this.data.slice(0, this.data.length - 1)
  }
}
export default {
  name: 'breadcrumb',
  init,
  template
}
