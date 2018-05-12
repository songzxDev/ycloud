import template from './index.html'
import Base from '../../core/base'
import ko from 'knockout'
class EditGrid extends Base {
  initialize (params) {
    this.isDataTable = params.isDataTable
    this.columns = params.columns
    // 保证表头和标题的_show绑定到同一个ko对象
    if (ko.isObservable(this.columns)) {
      this.columns().forEach(col => {
        col._show = col._show ? col._show : ko.observable(!col.hidden)
      })
    } else {
      this.columns.forEach(col => {
        col._show = col._show ? col._show : ko.observable(!col.hidden)
      })
    }
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
  name: 'editgrid',
  init: Base.createViewModel(EditGrid),
  template
}
