import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
import Base from '@/core/base'
const PREFIX = 'y-'
ko.components.register(PREFIX + head.name, {
  viewModel: head.init,
  template: head.template
})
ko.components.register(PREFIX + body.name, {
  viewModel: body.init,
  template: body.template
})
const PAGESIZE = 10
const PAGEINDEX = 0
class Grid extends Base {
  initialize (params) {
    this.isDataTable = params.isDataTable || false
    this.columns = params.columns
    this.rows = params.rows
    this.domId = params.id
    this.isTableBorder = params.isTableBorder || params.rowspan
    this.rowspan = params.rowspan
    this.maxheight = params.maxheight || '486px'
    this.minheight = params.minheight || 'auto'
    this.isStripe = params.isStripe || false
    this.expand = params.expand || true
    // 是否隐藏表头
    this.nohead = params.nohead || false
    this.noborder = params.noborder || false
    // expand是否默认展开
    this.defaultExpand = params.defaultExpand || false
    // 是否启用分页组件
    this.pagination = ko.observable(params.pagination || false)
    this.pageSize = params.pageSize || ko.observable(PAGESIZE)
    this.pageIndex = params.pageIndex || ko.observable(PAGEINDEX)
    this.totalCount = params.totalCount || ko.observable(0)
    this.allRowChecked = ko.observable(false)
    // event binding
    // 行选中
    this.onRowSelect = params.onRowSelect
    this.onPageChange = params.onPageChange
    this.onSizeChange = params.onSizeChange
  }
  computed (params) {
    // 只有表格数据大于10条才显示分页
    this.isShowPagination = ko.computed(() => {
      return params.pagination && this.totalCount() > 10
    })
    // 表格的宽度
    this.tableWidth = ko.computed(() => {
      let cols
      if (this.columns.subscribe) {
        cols = this.columns()
      } else {
        cols = this.columns
      }
      // 如果存在width不为数字的情况，则认为使用外层的容器宽度，即table宽度是100%
      // 只有在所有列都设置了固定宽度的情况下才支持横向滚动条
      const isUseOuterWidth = cols.some(cell => isNaN(cell.width))
      if (isUseOuterWidth) {
        return '100%'
      } else {
        return cols.map(cell => cell.width).reduce((a, b) => a + b, 0)
      }
    })
  }
  subscribe (params) {
    // 监听全选和反选
    this.allRowChecked.subscribe(isChecked => {
      // 集成datatable
      this.rows().forEach(row => {
        if (this.isDataTable) {
          if (isChecked) {
            row.parent.addRowSelect(row)
          } else {
            row.parent.setRowUnSelect(row)
          }
        } else {
          row._selected(isChecked)
        }
      })
    })
  }
}
export default {
  name: 'grid',
  init: Base.createViewModel(Grid),
  template
}
