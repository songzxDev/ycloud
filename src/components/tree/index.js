import template from './index.html'
import ko from 'knockout'
import treenode from './treenode'
import {validatemixin} from '../../mixin'
const PREFIX = 'y-'
ko.components.register(PREFIX + treenode.name, {
  viewModel: treenode.init,
  template: treenode.template
})
function init (params) {
  validatemixin.call(this, params)
  this.data = params.data
  this.height = params.height || 'auto'
  this.minHeight = params.minHeight || '0'
  this.loadData = params.loadData
  this.multiple = params.multiple || false
  this.selectedItem = params.selectedItem || (this.multiple ? ko.observableArray() : ko.observable({}))
  if (!this.multiple) {
    if (ko.isObservableArray(this.selectedItem)) {
      throw new Error('y-tree: selectedItem should be ko.observableArray while multiple = true')
    }
  }
  this.selectedId = params.selectedId || (this.multiple ? ko.observableArray() : ko.observable())
  this.selectedItem.subscribe(val => {
    if (params.onChange) {
      params.onChange(val)
    }
    // validate校验 用于通知父容器校验信息
    this.judgeValidate(val.id)
  })
}

export default {
  name: 'tree',
  init,
  template
}
