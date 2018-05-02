import template from './index.html'
import ko from 'knockout'
import Base from '../../core/base'
class ChildGrid extends Base {
  initialize (params) {
    this.isDataTable = params.isDataTable
    this.columns = params.columns
    this.pagination = params.pagination
    this.totalCount = params.totalCount
    this.pageSize = params.pageSize || ko.observable(10)
    this.pageIndex = params.pageIndex || ko.observable(0)
    this.onSizeChange = params.onSizeChange
    this.onPageChange = params.onPageChange
    this.rows = params.rows
    this.maxheight = params.maxheight
    this.minheight = params.minheight
    this.tdstyle = params.tdstyle
    // event binding
    // 行选中
    this.onRowSelect = params.onRowSelect
    this.style = params.style
    // 放在弹框内部的需要动态内部高度
    this.modalBodyModalHeight = params.modalBodyModalHeight
    this.modalBodyExtraHeight = params.modalBodyExtraHeight
    this.onModalOkValidate = params.onModalOkValidate
  }
  computed (params) {
  }
  subscribe (params) {
  }
  methods (params) {
  }
  created (params) {
  }
}
export default {
  name: 'childgrid',
  init: Base.createViewModel(ChildGrid),
  template
}
