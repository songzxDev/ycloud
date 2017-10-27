import template from './treenode.html'
function init (params) {
  this.data = params.data
  this.loadData = params.loadData || function () {}
  this.handleExpand = (data, event) => {
    // event.target
    var el = event.target
    while (!el.classList.contains('y-tree-icon')) {
      el = el.parentElement
    }
    if (el.classList.contains('y-tree-icon-expand')) {
      el.classList.remove('y-tree-icon-expand')
    } else {
      el.classList.add('y-tree-icon-expand')
    }
    el = el.parentElement
    if (el.classList.contains('y-tree-icon-expand')) {
      el.classList.remove('y-tree-icon-expand')
    } else {
      el.classList.add('y-tree-icon-expand')
    }
  }
}

export default {
  name: 'treenode',
  init,
  template
}
