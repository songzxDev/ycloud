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
  this.loadData = params.loadData
}

export default {
  name: 'tree',
  init,
  template
}
