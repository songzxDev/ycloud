import template from './index.html'
import ko from 'knockout'
import treenode from './treenode'
const PREFIX = 'y-'
ko.components.register(PREFIX + treenode.name, {
  viewModel: treenode.init,
  template: treenode.template
})
function init (params) {
  this.data = params.data
  this.height = params.height || 'auto'
  this.loadData = params.loadData
  this.selectedItem = params.selectedItem || ko.observable({})
  this.selectedItem.subscribe(val => {
    if (params.onSelect) {
      params.onSelect(val)
    }
  })
}

export default {
  name: 'tree',
  init,
  template
}
