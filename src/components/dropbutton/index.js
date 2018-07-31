import template from './index.html'
import ko from 'knockout'
import './index.less'
function init (params) {
  this.mainText = params.mainText || '新增'
  this.mainClick = params.mainClick || function () {}
  this.isShowDrop = ko.observable(false)
  this.showdropdown = () => {
    this.isShowDrop(!this.isShowDrop())
  }
  this.dropWidth = params.dropWidth || 85
  this.dataList = params.dataList || ko.isObservableArray([])
  this.handleOptClick = function (item) {
    params.handleOptClick(item)
  }
}
export default {
  name: 'dropbutton',
  init,
  template
}
