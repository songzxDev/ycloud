import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
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
function init (params) {
  this.isDataTable = params.isDataTable || false
  this.columns = params.columns
  this.rows = params.rows
  this.maxheight = params.maxheight || '484px'
  this.isStripe = params.isStripe || false
  // 是否启用分页组件
  this.pagination = ko.observable(params.pagination || false)
  this.onPageChage = params.onPageChange
  this.pageSize = params.pageSize || ko.observable(PAGESIZE)
  this.pageIndex = params.pageIndex || ko.observable(PAGEINDEX)
  this.totalCount = params.totalCount || ko.observable(0)
  // 只有表格数据大于10条才显示分页
  this.isShowPagination = ko.computed(() => {
    return params.pagination && this.totalCount() > 10
  })
  // event binding
  // 行选中
  this.onRowSelect = params.onRowSelect
}
export default {
  name: 'grid',
  init,
  template
}
