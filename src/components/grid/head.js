import template from './head.html'
import ko from 'knockout'
function init (params) {
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.columns1 = params.columns1 || ko.observableArray([])
  // 用于多行的rowspan
  this.columns2 = params.columns2 || ko.observableArray([])
  this.tableWidth = params.tableWidth
  this.el = params.el
  this.outterWidth = ko.observable()
  let nowOuterWidth = 0
  if (params.lockhead) {
    setInterval(() => {
      window.requestAnimationFrame(function () {
        if (params.el) {
          var width = params.el.firstElementChild.offsetWidth
          // 对于在modal中的grid需要特殊处理
          if (nowOuterWidth !== width) {
            nowOuterWidth = width
            if (width > 0) {
              this.outterWidth(width + 'px')
            } else {
              this.outterWidth('100%')
            }
          }
        }
      }.bind(this))
    }, 2000)
  }
  this.allRowChecked = params.allRowChecked
  this.lockhead = params.lockhead
  this.headtransform = params.headtransform
  // 排序算法回调
  this.handleSort = (vm, event) => {
    if (vm.sort) {
      let node = event.currentTarget
      // 同一个表格排序以前需要把其他排序列的标识先清空
      this.el.querySelectorAll('.y-cell-sortable').forEach(element => {
        if (node !== element) {
          element.classList.remove('y-sort-asc')
          element.classList.remove('y-sort-desc')
        }
      })

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
