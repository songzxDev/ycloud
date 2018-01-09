import template from './index.html'
import ko from 'knockout'
import treenode from './treenode'
import {validatemixin} from '@/mixin'
const PREFIX = 'y-'
ko.components.register(PREFIX + treenode.name, {
  viewModel: treenode.init,
  template: treenode.template
})
function init (params) {
  validatemixin.call(this, params)
  this.data = params.data
  this.height = params.height || 'auto'
  this.loadData = params.loadData
  this.showChecked = params.showChecked || false
  this.selectedItem = params.selectedItem || ko.observable({})
  this.selectedItem.subscribe(val => {
    if (params.onSelect) {
      params.onSelect(val)
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
