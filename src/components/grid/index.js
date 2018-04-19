import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
import Base from '../../core/base'
import _ from '../../util/lodash'
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
    this.hasSummaryRow = params.hasSummaryRow || false
    this.hasChildGrid = params.hasChildGrid || false
    this.caculateColumns = params.caculateColumns
    // 只有当columns1和columns2一起启用的时候才认为是启用了rowspanhead
    this.isRowspanHead = !!params.columns1 && !!params.columns2
    this.headtransform = ko.observable('translateX(0)')
    this.fixColumnTransform = ko.observable('translateY(0)')
    this.lockRightWidth = 0
    this.fixRightHeadtransform = ko.observable('translateX(0)')
    this.fixRightTransform = ko.observable('translate(0,0)')
    this.rowspan = params.rowspan
    this.rows = params.rows
    this.domId = params.rowspan ? Math.random() : ''
    this.isTableBorder = params.isTableBorder || params.rowspan
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
    // 是否启用固定列
    this.lockcolumn = params.lockcolumn || false
    this.lockright = params.lockright || false
    // 固定表头
    this.lockhead = params.lockhead || params.lockcolumn

    this.headHeight = params.headHeight || '45px'
    this.scrollHeight = params.scrollHeight || '15px'
    this.pageSize = params.pageSize || ko.observable(PAGESIZE)
    this.pageIndex = params.pageIndex || ko.observable(PAGEINDEX)
    this.totalCount = params.totalCount || ko.observable(0)
    this.tdstyle = params.tdstyle || {}
    this.verticalAlign = params.verticalAlign || 'middle'
    // event binding
    // 行选中
    this.onRowSelect = params.onRowSelect || function () {}
    this.onPageChange = params.onPageChange
    this.onSizeChange = params.onSizeChange
    this.isSeparate = params.isSeparate || false
    this.style = params.style || {}
    this.forbitRowSelect = ko.observable(params.forbitRowSelect || false)
    this.forbitRowSelectFn = params.forbitRowSelectFn
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
    // 用于触发宽度重新计算
    this.reComputedTableWidth = ko.observable(false)
  }
  computed (params) {
    // 用于存储对应关系
    this.columns1UniqueKeys = {}
    this.columns1 = ko.computed(() => {
      if (params.columns1) {
        var _columns1 = []
        params.columns1().forEach((col) => {
          if (!col.loop) {
            _columns1.push(col)
          } else {
            // 有数据才根据数据显示loop列
            if (this.rows().length > 0) {
              var looplength = col.looplength(this.rows()[0])
              for (var i = 0; i < looplength; i++) {
                var _col = Object.assign({}, col, {title: col.title.replace('{n}', i + 1)})
                _columns1.push(_col)
              }
              if (ko.isObservable(this.columns1UniqueKeys[col.uniqueKey])) {
                this.columns1UniqueKeys[col.uniqueKey](looplength)
              } else {
                this.columns1UniqueKeys[col.uniqueKey] = ko.observable(looplength)
              }
            } else {
              this.columns1UniqueKeys[col.uniqueKey] = ko.observable(0)
            }
          }
        })
        return _columns1
      } else {
        return []
      }
    })
    // 暂定只支持ko对象
    this.columns2 = ko.computed(() => {
      if (params.columns2) {
        var _columns2 = []
        params.columns2().forEach((col) => {
          if (!col.loop) {
            _columns2.length++
          } else {
            _columns2.length += this.columns1UniqueKeys[col.uniqueKey]()
          }
        })
        var crossLength = _.groupBy(params.columns2().map((col) => {
          return {key: col.uniqueKey}
        }), 'key')
        var index = 0
        params.columns2().forEach((col) => {
          // 找到第一个没有赋值的列然后塞入
          while (_columns2[index]) {
            index++
          }
          if (!col.loop) {
            _columns2[index] = col
            index++
          } else {
            var _length = this.columns1UniqueKeys[col.uniqueKey]()
            for (var i = 0; i < _length; i++) {
              _columns2[index + i * crossLength[col.uniqueKey].length] = Object.assign({}, col, {_childIndex: i})
            }
            // 计算索引
            if (_length > 0) {
              index++
            }
          }
        })
        return _columns2
      } else {
        return []
      }
    })
    // 计算真是的columns列
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
          col.observeTitle = col.observeTitle || false
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
    // 只有表格数据大于10条才显示分页
    this.isShowPagination = ko.computed(() => {
      return params.pagination && this.totalCount() > 10
    })
    // 表格的宽度
    this.tableWidth = ko.computed(() => {
      let cols = this.columns()
      this.reComputedTableWidth && this.reComputedTableWidth()
      // 如果存在width不为数字的情况，则认为使用外层的容器宽度，即table宽度是100%
      // 只有在所有列都设置了固定宽度的情况下才支持横向滚动条
      const isUseOuterWidth = cols.some(cell => isNaN(cell.width))
      if (isUseOuterWidth) {
        return '100%'
      } else {
        return cols.filter(cell => cell._show()).map(cell => cell.width).reduce((a, b) => Number(a) + Number(b), 0) + 'px'
      }
    })
    this.fixBodyHeight = ko.pureComputed(() => {
      if (this.height !== 'auto') {
        return this.computeMaxHeight().replace('px', '') - this.scrollHeight.replace('px', '') + 'px'
      } else {
        return 'auto'
      }
    })
    // 计算锁定列的宽度
    this.fixedTableWidth = ko.pureComputed(() => {
      let cols = this.columns()
      // lock列需要指定宽度
      const isUseOuterWidth = cols.filter(cell => cell.lock).filter(cell => cell._show()).some(cell => isNaN(cell.width))
      if (isUseOuterWidth) {
        return '0px'
      } else {
        return cols.filter(cell => cell.lock).filter(cell => cell._show()).map(cell => cell.width).reduce((a, b) => Number(a) + Number(b), 0) + 'px'
      }
    })
    this.fixedLockRightTableWidth = ko.pureComputed(() => {
      let cols = this.columns()
      // lock列需要指定宽度
      const isUseOuterWidth = cols.filter(cell => cell.lockright).some(cell => isNaN(cell.width))
      if (isUseOuterWidth) {
        return '0px'
      } else {
        return cols.filter(cell => cell.lockright).map(cell => cell.width).reduce((a, b) => Number(a) + Number(b), 0) + 'px'
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
    // 全选
    this.allRowChecked = ko.pureComputed({
      read: function () {
        var flag = this.rows().length > 0
        for (var i = 0; i < this.rows().length; i++) {
          if (this.isDataTable) {
            if (!this.rows()[i].selected()) {
              flag = false
              break
            }
          } else {
            if (this.rows()[i]._selected) {
              if (!this.rows()[i]._selected()) {
                flag = false
                break
              }
            } else {
              flag = false
            }
          }
        }
        return flag
      },
      write: function (isChecked) {
        this.rows().forEach(row => {
          row._selected(isChecked)
        })
        // 如果不是dataTable则需要出发全选
        if (!this.isDataTable) {
          this.rows.splice(0, 0)
        }
      },
      owner: this
    })
  }
  subscribe (params) {
    this.columns.subscribe(val => {
      if (this.lockright) {
        this.recomputedLockRight()
      }
    })
  }
  methods (params) {
    this.recomputedLockRight = () => {
      let columns = this.columns()
      this.lockRightWidth = columns.filter(col => !col.lockright).filter(col => col._show()).map(cell => cell.width).reduce((a, b) => Number(a) + Number(b), 0)
      this.fixRightHeadtransform('translateX(-' + this.lockRightWidth + 'px)')
      this.fixRightTransform('translate(-' + this.lockRightWidth + 'px,0)')
    }
    this.handleScroll = (vm, event) => {
      // 仅当锁定表头时才自动滚动列
      if (this.lockhead || this.lockcolumn) {
        let scrollLeft = event.currentTarget.scrollLeft
        let scrollTop = event.currentTarget.scrollTop
        this.headtransform('translateX(-' + scrollLeft + 'px)')
        this.fixColumnTransform('translateY(-' + scrollTop + 'px)')
        this.fixRightTransform('translate(-' + this.lockRightWidth + 'px, -' + scrollTop + 'px)')
      }
    }
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
      if (this.lockright) {
        this.recomputedLockRight()
      }
      this.reComputedTableWidth(!this.reComputedTableWidth())
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
    if (this.lockright) {
      this.recomputedLockRight()
    }
  }
}
export default {
  name: 'grid',
  init: Base.createViewModel(Grid),
  template
}
