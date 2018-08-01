// click 参数是 主点击事件
// dropList 下拉按钮组的data  类似{value:1，label:'新增'}
// onDropList 下拉按钮组点击事件 根据参数判断执行事件
// 欢迎吐槽  by wjk
import template from './index.html'
import ko from 'knockout'
import Base from '../../core/base'
import './index.less'
class DropButton extends Base {
  initialize (params) {
    this.text = params.text || '新增'
    this.mainClick = params.click || function () {}
    this.isShowDrop = ko.observable(false)
    this.dropWidth = params.dropWidth
    this.dropList = params.dropList || ko.isObservableArray([])
  }
  methods (params) {
    this.showdropdown = () => {
      this.isShowDrop(!this.isShowDrop())
    }
    this.handleOptClick = function (item) {
      params.onDropList(item)
    }
    this.handleHideDrop = () => {
      this.isShowDrop(false)
    }
  }
}
export default {
  name: 'button-group',
  init: Base.createViewModel(DropButton),
  template
}
