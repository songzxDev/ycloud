import template from './treenode.html'
import ko from 'knockout'
var init = function (params) {
  this.multiple = params.multiple
  var data = params.data
  data._checked = ko.isObservable(data._checked) ? data._checked : ko.observable(!!data._checked)
  this.data = ko.observable(data)
  this.extraEdit = params.extraEdit
  this.extraText = params.extraText
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
      if (this.loadData && !this.loaded()) {
        return true
      } else {
        return false
      }
    }
  })
  this.isNodeSelected = ko.computed(() => {
    if (this.multiple) {
      return this.selectedItem() && this.selectedItem.indexOf(this.data()) > -1
    } else {
      return this.selectedItem() && this.selectedItem().id === this.data().id
    }
  })
  this.expanded = ko.observable(false)
  this.selectedId = params.selectedId
  // 多选场景下需要默认选中
  if (ko.isObservableArray(this.selectedId)) {
    if (this.selectedId().indexOf(data.id) > -1) {
      data._checked(true)
      // 添加到已选中的项之中
      this.selectedItem.indexOf(data) < 0 && this.selectedItem.push(data)
    }
  }
  data._checked.subscribe((val) => {
    this.handleClickNode(this, null, true)
  })
}
// 展开子节点
init.prototype.handleExpand = function (data, event) {
  if (this.loaded()) {
    this.expanded(!this.expanded())
  } else {
    this.isLoading(true)
    this.loadData(data.data(), function (childrenData) {
      this.isLoading(false)
      var _data = this.data()
      // 设置默认勾选
      if (this.multiple) {
        childrenData && childrenData.forEach((child) => {
          // 如果选中的id存在则勾选
          if (this.selectedId().indexOf(child.id) > -1) {
            child._checked = ko.observable(true)
            this.selectedItem.indexOf(data) < 0 && this.selectedItem.push(child)
          }
        })
      }
      if (childrenData && childrenData.length > 0) {
        _data.children = childrenData
      }
      this.data(_data)
      this.expanded(!this.expanded())
      this.loaded(true)
    }.bind(this))
  }
}
// 选中子节点 将选中值赋值给选中的
init.prototype.handleClickNode = function (data, event, checkFlag) {
  let item = this.data()
  // 直返会当前项不返回子节点
  item.children = []
  // 表示多选
  if (this.multiple) {
    if (!checkFlag) {
      item._checked(!item._checked())
    }
    var _index = this.selectedItem.indexOf(item)
    // 如果选中，加入已选中列表中，如果反宣，将其
    if (item._checked()) {
      if (_index < 0) {
        this.selectedItem.push(item)
      }
    } else {
      if (_index >= 0) {
        this.selectedItem.splice(_index, 1)
      }
    }
  } else {
    if (this.selectedItem() === item) {
      this.selectedItem({})
    } else {
      this.selectedItem(item)
    }
  }
}

export default {
  name: 'treenode',
  init,
  template
}
