import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
import Base from '../../core/base'
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
    // 只有当columns1和columns2一起启用的时候才认为是启用了rowspanhead
    this.isRowspanHead = !!params.columns1 && !!params.columns2
    this.columns1 = params.columns1 // 暂定只支持ko对象
    this.columns2 = params.columns2
    window.col1 = this.columns1
    window.col2 = this.columns2
    this.columns = ko.computed(() => {
      var columns = []
      // 先判断是否启用columns1和columns2
      if (this.isRowspanHead) {
        var columns2 = [].concat(this.columns2())
        this.columns1().forEach((col) => {
          if (col.colspan > 1) {
            var colspanlength = col.colspan
            var row2columns = columns2.splice(0, colspanlength)
            columns = columns.concat(row2columns)
          } else {
            columns.push(col)
          }
        })
      }
      if (columns.length === 0) {
        columns = params.columns
      }
      // 出事化列内置一些属性 _show 用来隐藏和显示列
      if (ko.isObservable(columns)) {
        columns().forEach((col) => {
          // checkbox设定特殊宽度
          if (col.type === 'checkbox') {
            col.width = 35
          }
          col._show = ko.observable(!col.hidden)
        })
        return params.columns()
      } else {
        columns.forEach((col) => {
          if (col.type === 'checkbox') {
            col.width = 35
          }
          col._show = ko.observable(!col.hidden)
        })
        return columns
      }
    })
    this.rows = params.rows
    this.lockhead = params.lockhead || false
    this.domId = params.id
    this.isTableBorder = params.isTableBorder || params.rowspan
    this.rowspan = params.rowspan
    this.maxheight = params.maxheight || '486px'
    this.minheight = params.minheight || 'auto'
    this.isStripe = params.isStripe || false
    this.expand = params.expand || true
    // 是否显示loading图标
    this.isShowLoading = ko.observable(false)
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
    this.tdstyle = params.tdstyle || {}
    // event binding
    // 行选中
    this.onRowSelect = params.onRowSelect || function () {}
    this.onPageChange = params.onPageChange
    this.onSizeChange = params.onSizeChange
    this.isSeparate = params.isSeparate || false
    this.style = params.style || {}
    this.forbitRowSelect = ko.observable(params.forbitRowSelect || false)
    // 放在弹框内部的需要动态内部高度
    this.modalBodyModalHeight = params.modalBodyModalHeight || 0
    this.modalBodyExtraHeight = params.modalBodyExtraHeight || '0'
    this.onModalOkValidate = params.onModalOkValidate || function () {}
    // add by songhlc 2018-01-02 添加grid跨页选中功能
    this.crossPageSelectedRows = params.crossPageSelectedRows // 如果rows的是datatable那么这里存的row就是datatable的row
    // 默认使用id属性做为行唯一标识符
    this.crossPageRowPrimaryKey = params.crossPageRowPrimaryKey || 'id'
    // 用于判断是否启用跨页选择
    this.isEnableCrossPage = Boolean(this.crossPageSelectedRows)
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
    // grid下有传入自定义组件
    this.hasMarkup = ko.computed(() => {
      if (this.$templateNodes.length > 0) {
        let nodeList = this.$templateNodes.filter((node) => {
          return node.nodeName !== '#text' && node.nodeName !== '#comment'
        })
        return nodeList.length > 0
      } else {
        return false
      }
    })
  }
  subscribe (params) {
    // 监听全选和反选
    this.allRowChecked.subscribe(isChecked => {
      // 集成datatable
      this.rows().forEach(row => {
        row._selected(isChecked)
      })
    })
  }
  methods (params) {
    // 设置loading图标是否显示
    this.showLoading = (isShow) => {
      this.isShowLoading(isShow)
    }
    // 获取所有选中的行数据
    this.getSelectedRows = () => {
      let selectedRows = []
      this.rows().forEach((item) => {
        if (item._selected && item._selected()) {
          selectedRows.push(item)
        }
      })
      return selectedRows
    }
    // 设置列显示隐藏
    this.setColVisibleByField = (field, visible) => {
      this.columns().forEach((col) => {
        if (col.field === field) {
          col._show(visible)
        }
      })
    }
    // 切换行是否禁止选中
    this.setRowSelectEnable = (isEnable) => {
      this.forbitRowSelect(isEnable)
    }
    this.computeMaxHeight = () => {
      var maxheight = this.maxheight
      // 如果是在modal中，maxheight = 外层height - extraHeight - paginationHeight - 内层padding高度
      if (maxheight === 'auto') {
        return 'auto'
      } else if (this.modalBodyModalHeight) {
        var _modalBodyModalHeight = this.modalBodyModalHeight.toString().replace('px', '')
        var _modalBodyExtraHeight = this.modalBodyExtraHeight.replace('px', '')
        var _paginationHeight = 0
        var _paddingHeight = 33 // padding+border高度
        if (this.pagination()) {
          _paginationHeight = 36
        }
        var result = _modalBodyModalHeight - _modalBodyExtraHeight - _paginationHeight - _paddingHeight
        // 如果超过允许外层的最大高度
        if (maxheight.replace('px', '') - 0 > result) {
          return result + 'px'
        } else {
          return maxheight
        }
      } else {
        return maxheight
      }
    }
  }
  created (params) {
    this.computedMaxHeight = this.computeMaxHeight()
  }
}
export default {
  name: 'grid',
  init: Base.createViewModel(Grid),
  template
}
