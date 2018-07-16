import ko from 'knockout'
import _ from '../../util/lodash'
import Base from '../../core/base'
const PAGESIZE = 10
const PAGEINDEX = 0
// 需要支持外部修改crossPageSeletedRows 同时内部全选的时候又不触发
let isTriggerInside = false
class Grid extends Base {
  initialize (params) {
    this.lazy = params.lazy
    this.lockColumnHeight = ko.observable({})
    this.isDataTable = params.isDataTable || false
    this.hasSummaryRow = params.hasSummaryRow || false
    this.hasChildGrid = params.hasChildGrid || false
    this.caculateColumns = params.caculateColumns
    // 只有当columns1和columns2一起启用的时候才认为是启用了rowspanhead
    this.isRowspanHead = !!params.columns1 && !!params.columns2
    this.headtransform = ko.observable('translateX(0)')
    this.fixColumnTransform = ko.observable('translateY(0)')
    this.vertiacalScrollTransform = ko.observable('translateX(0)')
    this.lockRightWidth = 0
    this.fixRightHeadtransform = ko.observable('translateX(0)')
    this.fixRightTransform = ko.observable('translate(0,0)')
    this.rowspan = params.rowspan
    this.domId = params.rowspan ? Math.random() : ''
    this.isTableBorder = params.isTableBorder || params.rowspan
    this.maxheight = params.maxheight || '486px'
    this.minheight = params.minheight || 'auto'
    this.isStripe = params.isStripe || false
    this.expand = params.expand || true
    // 是否启用自定义的transform
    this.verticalScroll = params.verticalScroll || false
    this.scrollStyle = params.scrollStyle || {}
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
    this.showLockRightToolBar = ko.observable(true)
    // 固定表头
    this.lockhead = params.lockhead || params.lockcolumn

    this.headHeight = params.headHeight || '45px'
    this.scrollHeight = params.scrollHeight || '15px'
    this.startIndex = params.startIndex || 0
    this.pageSize = params.pageSize || ko.observable(PAGESIZE)
    this.pageIndex = params.pageIndex || ko.observable(PAGEINDEX)
    this.pageSizeList = params.pageSizeList
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
    var that = this
    // 用来动态高度计算用的
    this.columnNumberHeight = ko.pureComputed(() => {
      var item = this.lockColumnHeight()
      var heights = Object.keys(item).map(function (key) {
        return item[key].replace('px', '') - 0
      })
      return heights
    })
    // 外部使用判断当前合适的高度 用于每一行高度不一致的时候
    // 由于更新问题 可能返回-1 当返回-1时需要和外部
    this.getFitIndexByScrollTop = (destHeight) => {
      var sum = 0
      var index = -1
      var lockColumnHeight = this.columnNumberHeight()
      for (var i = 0; i < lockColumnHeight.length; i++) {
        if (destHeight > sum) {
          sum += lockColumnHeight[i]
        } else {
          index = i
          break
        }
      }
      return index
    }
    // 已选中的ids
    this.crossPageSelectedIds = ko.computed(() => {
      if (this.isEnableCrossPage) {
        return this.crossPageSelectedRows().map((row) => {
          if (this.isDataTable) {
            return row.ref(this.crossPageRowPrimaryKey)()
          } else {
            return row[this.crossPageRowPrimaryKey]
          }
        })
      } else {
        return []
      }
    }).extend({defered: true})
    this.rows = ko.computed(() => {
      var datas = params.rows()
      datas.forEach((row, index) => {
        // 减轻重复赋值的压力
        !row._delete && (row._delete = ko.observable(false))
        !row._hover && (row._hover = ko.observable(false))
        !row._disabled && (row._disabled = ko.observable(false))
        !row._expand && (row._expand = ko.observable(this.defaultExpand))
        if (this.isDataTable) {
          // 如果是dataTable设置成计算属性
          !row._selected && (row._selected = ko.pureComputed({
            read: function () {
              return row.selected()
            },
            write: function (val) {
              // 设置datatable的选中
              if (val) {
                row.parent.addRowSelect(row)
              } else {
                row.parent.setRowUnSelect(row)
              }
              if (that.crossPageSelectedRows) {
                isTriggerInside = true
                // 设置已选中rows的值
                var _index = that.crossPageSelectedIds().indexOf(row.getValue(that.crossPageRowPrimaryKey))
                if (val) {
                  if (_index === -1) {
                    that.crossPageSelectedRows.push(row)
                  }
                } else {
                  if (_index >= 0) {
                    that.crossPageSelectedRows.splice(_index, 1)
                  }
                }
                setTimeout(function () {
                  isTriggerInside = false
                })
              }
              that.onRowSelect(row)
            }
          }))
          // 如果当前行在已选中的ids中则设置选中（设置默认选中）这里不能使用监听对象，初始化的时候要用peek
          if (that.isEnableCrossPage && that.crossPageSelectedIds.peek().indexOf(row.getValue(that.crossPageRowPrimaryKey)) >= 0) {
            row.parent.addRowSelect(row)
          }
        } else {
          var newRow = !row._selected
          newRow && (row._selected = ko.observable(false))
          if (that.isEnableCrossPage) {
            // 初始化选中状态
            if (that.crossPageSelectedIds().indexOf(row[that.crossPageRowPrimaryKey]) >= 0) {
              row._selected(true)
            } else {
              row._selected(false)
            }
          }
          if (newRow) {
            row._selected.subscribe(function (val) {
              if (that.isEnableCrossPage) {
                // 设置已选中rows的值
                var _index = that.crossPageSelectedIds().indexOf(row[that.crossPageRowPrimaryKey])
                if (val) {
                  if (_index === -1) {
                    params.crossPageSelectedRows.push(row)
                  }
                } else {
                  if (_index >= 0) {
                    params.crossPageSelectedRows.splice(_index, 1)
                  }
                }
              }
              that.onRowSelect(row)
            })
          }
        }
      })
      return params.rows()
    }).extend({deferred: true})
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
                var title = ''
                // 为了支持索引自定义
                if (typeof (col.title) === 'function') {
                  title = col.title(i + 1, looplength)
                } else {
                  title = col.title.replace('{n}', i + 1)
                }
                var _col = Object.assign({}, col, {title: title})
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
          // 原来是colspan > 1才计算，实际上只要colspan有值就应该处理
          if (col.colspan) {
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
          col._show = col._show ? col._show : ko.observable(!col.hidden)
        })
        return params.columns()
      } else {
        columns.forEach((col) => {
          if (col.type === 'checkbox') {
            col.width = 35
          }
          col._show = col._show ? col._show : ko.observable(!col.hidden)
        })
        return columns
      }
    })
    this.lockleftColumns = ko.computed(() => {
      let _columns = this.columns().filter(col => {
        return col.lock
      })
      // 补充列用于填充行，方便行列合并计算
      _columns.push({
        title: '',
        type: 'render',
        _show: true,
        width: 0,
        renderFn: function (row, index) {
          return index % 2
        }
      })
      return _columns
    })
    // 只有表格数据大于10条才显示分页
    this.isShowPagination = ko.computed(() => {
      return params.pagination && this.totalCount() > this.pageSize()
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
      const isUseOuterWidth = cols.filter(cell => cell.lockright).filter(cell => cell._show()).some(cell => isNaN(cell.width))
      if (isUseOuterWidth) {
        return '0px'
      } else {
        return cols.filter(cell => cell.lockright).filter(cell => cell._show()).map(cell => cell.width).reduce((a, b) => Number(a) + Number(b), 0) + 'px'
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
    this.allRowChecked = ko.computed({
      read: function () {
        var rows = params.rows()
        var flag = rows.length > 0
        for (var i = 0; i < rows.length; i++) {
          if (this.isDataTable) {
            if (!rows[i].selected()) {
              flag = false
              break
            }
          } else {
            if (rows[i]._selected) {
              if (!rows[i]._selected()) {
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
        if (this.isDataTable && this.crossPageSelectedRows) {
          var seletedRow = this.crossPageSelectedRows.peek()
          var seletedIds = seletedRow.map(function (val) {
            return val.getValue(that.crossPageRowPrimaryKey)
          })
          if (isChecked) {
            params.rows().forEach(row => {
              var index = seletedIds.indexOf(row.getValue(that.crossPageRowPrimaryKey))
              if (index < 0) {
                seletedRow.push(row)
                seletedIds.push(row.rowId)
              }
            })
          } else {
            params.rows().forEach(row => {
              var index = seletedIds.indexOf(row.getValue(that.crossPageRowPrimaryKey))
              if (index >= 0) {
                seletedRow.splice(index, 1)
                seletedIds.splice(index, 1)
              }
            })
          }
          this.crossPageSelectedRows(seletedRow)
        } else {
          params.rows().forEach(row => {
            row._selected(isChecked)
          })
        }
        // 如果不是dataTable则需要出发全选
        if (!this.isDataTable) {
          params.rows.splice(0, 0)
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
    this.crossPageSelectedIds.subscribe(ids => {
      if (this.isDataTable) {
        if (!isTriggerInside) {
          params.rows.peek().forEach(row => {
            if (ids.indexOf(row.getValue(this.crossPageRowPrimaryKey)) > -1) {
              row.parent.addRowSelect(row)
            } else {
              row.parent.setRowUnSelect(row)
            }
          })
        }
      }
    })
  }
  methods (params) {
    // 切换lockright动态显示
    this.handleToogleLockright = (vm, event) => {
      if (event.currentTarget.classList.contains('y-lock-toolbar-hide')) {
        this.showLockRightToolBar(true)
        event.currentTarget.classList.remove('y-lock-toolbar-hide')
      } else {
        this.showLockRightToolBar(false)
        event.currentTarget.classList.add('y-lock-toolbar-hide')
      }
    }
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
        if (this.verticalScroll) {
          this.vertiacalScrollTransform('translateX(-' + scrollLeft + 'px)')
        }
        this.fixRightTransform('translate(-' + this.lockRightWidth + 'px, -' + scrollTop + 'px)')
        if (params.handleScroll) {
          params.handleScroll(event, scrollTop, scrollLeft)
        }
      }
    }
    // 设置loading图标是否显示
    this.showLoading = (isShow) => {
      this.isShowLoading(isShow)
    }
    // 获取所有选中的行数据
    this.getSelectedRows = () => {
      let selectedRows = []
      params.rows().forEach((item) => {
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
    // 根据field获取column
    this.getColByField = (field) => {
      var curColumn = {}
      this.columns().forEach((col) => {
        if (col.field === field) {
          curColumn = col
        }
      })
      return curColumn
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
export default Grid
