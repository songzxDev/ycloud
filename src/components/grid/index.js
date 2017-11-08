import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
import Base from '../core/base'
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
    this.maxheight = params.maxheight || '484px'
    this.minheight = params.minheight || 'auto'
    this.isStripe = params.isStripe || false
    this.expand = params.expand || true
    // 是否启用分页组件
    this.pagination = ko.observable(params.pagination || false)
    this.pageSize = params.pageSize || ko.observable(PAGESIZE)
    this.pageIndex = params.pageIndex || ko.observable(PAGEINDEX)
    this.totalCount = params.totalCount || ko.observable(0)
    // 只有表格数据大于10条才显示分页
    this.isShowPagination = ko.computed(() => {
      return params.pagination && this.totalCount() > 10
    })
    this.allRowChecked = ko.observable(false)
    // event binding
    // 行选中
    this.onRowSelect = params.onRowSelect
    this.onPageChange = params.onPageChange
    this.onSizeChange = params.onPageChange
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
