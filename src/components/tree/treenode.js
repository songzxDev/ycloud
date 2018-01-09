import template from './treenode.html'
import ko from 'knockout'
function init (params) {
  this.showChecked = params.showChecked
  var data = params.data
  data._checked = ko.isObservable(data._checked) ? data._checked : ko.observable(!!data._checked)
  this.data = ko.observable(data)
  this.loadData = params.loadData
  this.selectedItem = params.selectedItem
  this.loaded = ko.observable(params.loadData === undefined)
  this.isLoading = ko.observable(false)
  this.isShowExpanIcon = ko.computed(() => {
    // 如果children有值休闲室
    if (this.data().children && this.data().children.length > 0) {
      return true
    } else if (this.isLoading()) { // 如果正在加载 那么也要隐藏
      return false
    } else {
      // 需要异步加载切还没有点击过加载，也需要显示
      if (params.loadData && !this.loaded()) {
        return true
      } else {
        return false
      }
    }
  })
  this.isNodeSelected = ko.computed(() => {
    return this.selectedItem().id === this.data().id
  })
  // 选中子节点 将选中值赋值给选中的
  this.handleClickNode = (data, event) => {
    let item = data.data()
    // 直返会当前项不返回子节点
    item.children = []
    // 表示多选
    if (this.showChecked) {
      item._checked(!item._checked())
    } else {
      // todo 如果是多选则需要重新处理
      if (this.selectedItem() === item) {
        this.selectedItem({})
      } else {
        this.selectedItem(item)
      }
    }
  }
  this.expanded = ko.observable(false)
  // 展开子节点
  this.handleExpand = (data, event) => {
    if (this.loaded()) {
      this.expanded(!this.expanded())
    } else {
      this.isLoading(true)
      params.loadData(data.data(), function (childrenData) {
        this.isLoading(false)
        var _data = this.data()
        if (childrenData && childrenData.length > 0) {
          _data.children = childrenData
        }
        this.data(_data)
        this.expanded(!this.expanded())
        this.loaded(true)
      }.bind(this))
    }
  }
}

export default {
  name: 'treenode',
  init,
  template
}
