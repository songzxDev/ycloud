import template from './head.html'
import ko from 'knockout'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.columns1 = params.columns1 || ko.observableArray([])
  // 用于多行的rowspan
  this.columns2 = params.columns2 || ko.observableArray([])
  this.tableWidth = params.tableWidth
  this.outterWidth = ko.observable()
  if (params.lockhead) {
    setTimeout(function () {
      if (params.el) {
        var width = params.el.firstElementChild.offsetWidth
        // 对于在modal中的grid需要特殊处理
        if (width > 0) {
          this.outterWidth(width + 'px')
        } else {
          this.outterWidth('100%')
        }
      }
    }.bind(this))
  }
  this.allRowChecked = params.allRowChecked
  this.lockhead = params.lockhead
  this.headtransform = params.headtransform
  // 排序算法回调
  this.handleSort = (vm, event) => {
    if (vm.sort) {
      let node = event.currentTarget
      if (node.classList.contains('y-sort-asc')) {
        node.classList.add('y-sort-desc')
        node.classList.remove('y-sort-asc')
        vm.sortFn && vm.sortFn('desc')
      } else {
        node.classList.add('y-sort-asc')
        node.classList.remove('y-sort-desc')
        vm.sortFn && vm.sortFn('asc')
      }
    }
  }
}

export default {
  name: 'grid-head',
  init,
  template
}
