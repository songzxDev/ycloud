import ko from 'knockout'
import Base from '../../core/base'
import util from './gridutil'
import getLang from '../../i18n'
class Body extends Base {
  initialize (params) {
    this.lazy = params.lazy
    this.i18nNoData = getLang('暂无数据')
    this.hasSummaryRow = params.hasSummaryRow || false
    // 用在子表一对多的场景之中
    this.hasChildGrid = params.hasChildGrid || false
    this.isDataTable = params.isDataTable
    this.caculateColumns = params.caculateColumns
    this.expand = params.expand
    this.columns = params.columns
    this.rows = params.rows
    this.domId = params.domId
    this.onRowSelect = params.onRowSelect
    this.defaultExpand = params.defaultExpand || false
    this.isNoDataCustomTpl = params.isNoDataCustomTpl || false
    this.lockhead = params.lockhead
    this.tdstyle = params.tdstyle
    this.isSeparate = params.isSeparate
    this.forbitRowSelect = params.forbitRowSelect || function () {}
    this.forbitRowSelectFn = params.forbitRowSelectFn || function () { return false }
    this.isShowLoading = params.isShowLoading
    this.transform = params.transform
    this.headHeight = params.headHeight
    this.verticalAlign = params.verticalAlign
    this.lockColumnHeight = params.lockColumnHeight
    this.isLockLeft = params.isLockLeft || false
    this.tableWidth = params.isLockLeft ? function () {
      return '100%'
    } : params.tableWidth
    this.computedLockColumnHeight = ko.observable({})
    this.computedLockColumnHeight.subscribe((val) => {
      var length = this.rows.peek().length
      var count = 0
      for (var pro in val) {
        if (val.hasOwnProperty(pro)) { // 这里扩展了对象,所以必须判断
          count++
        }
      }
      // 如果所有的都渲染完了 count可能比实际数量多（重新setSimpleData 数量变少）
      if ((length <= count && length > 0) || params.lazy) {
        params.lockColumnHeight(val)
      }
    })
  }
  computed (params) {
    var that = this
    this.getRowHeight = function (rowIndex) {
      if (params.isLockLeft || params.lazy) {
        return params.lockColumnHeight()[rowIndex] ? params.lockColumnHeight()[rowIndex].height : 'auto'
      } else {
        return 'auto'
      }
    }
    // 状态tab切换或重新加载不同数据后需要清空缓存的列高度
    this.rows.subscribe(function () {
      // 默认getRowHeight是从里面取的所以要把所有的都清空
      params.lockColumnHeight({})
      // 当调用addSimpleData的时候 需要只把原来没变化的设置成needRefresh=true 保留原来的高度（已经渲染过的不会重新走afterrender）
      var allHeight = that.computedLockColumnHeight()
      for (var prop in allHeight) {
        if (allHeight.hasOwnProperty(prop)) { // 这里扩展了对象,所以必须判断
          allHeight[prop].needRefresh = true
        }
      }
      that.computedLockColumnHeight(allHeight)
    }, 'beforeChange')
    this.summaryAfterRender = (elements, data) => {
      // setTimeout(function () {
      ko.tasks.schedule(function () {
        var element = elements.filter(function (el) {
          return el.nodeName === 'TR'
        })[0]
        element.style.width = '100%'
      })
      // })
    }
    this.afterRender = (elements, data) => {
      if (!params.isLockLeft) {
        var lockColumnHeight = that.computedLockColumnHeight()
        if (!lockColumnHeight[data.rowIndex] || lockColumnHeight[data.rowIndex].needRefresh) {
          setTimeout(function () {
            var height = elements.filter(function (el) {
              return el.nodeName === 'TR'
            })[0].offsetHeight
            if (height > 0) {
              lockColumnHeight[data.rowIndex] = {
                height: height + 'px',
                needRefresh: false
              }
              that.computedLockColumnHeight({})
              that.computedLockColumnHeight(lockColumnHeight)
            }
          })
        }
      }
    }
    // td渲染的不同模板
    this.displayMode = (data) => {
      switch (data.col.type) {
        case 'index': return 'y-template-index'
        case 'checkbox': return 'y-template-checkbox'
        case 'render': return 'y-template-render'
        case 'component': return 'y-template-component'
        case 'comp': return 'y-template-component'
        case 'operation': return 'y-template-operation'
        default: return 'y-template-noType'
      }
    }
    // 格式化表格默认值
    this.defaultFormatText = util.defaultFormatText
    this.gridBodyStyle = ko.pureComputed(() => {
      let style = {}
      if (this.lockhead) {
        style.marginTop = this.headHeight
      }
      return style
    })
    // 计算暂无数据的单元格合并
    this.nodataColSpan = ko.computed(() => {
      if (params.columns && params.columns.subscribe) {
        return params.columns().length
      } else {
        return params.columns.length
      }
    })
    // 是否支持多选
    this.isMultiSelect = ko.computed(() => {
      if (params.columns.subscribe) {
        return params.columns().filter(col => {
          return col.type === 'checkbox'
        }).length > 0
      } else {
        return params.columns.filter(col => {
          return col.type === 'checkbox'
        }).length > 0
      }
    })
    this.expandColspan = ko.computed(() => {
      let count = 0
      this.columns().forEach(col => {
        if (ko.isObservable(col._show) && col._show()) {
          count++
        } else if (!ko.isObservable(col._show) && col._show) { // 确保_show为true的状况
          count++
        }
      })
      return count
    })
    // 暂无数据区域的高度
    this.noDataHeight = ko.computed(() => {
      if (params.maxheight === 'auto') {
        return 'auto'
      } else {
        return params.maxheight.replace('px', '') - 150 + 'px'
      }
    })
  }
  created (params) {
    if (params.rowspan) {
      setTimeout(() => {
        ko.tasks.schedule(function () {
          if (params.rowspan.columnIndex) {
            this.caculateRowspanByFields(params.rowspan.columnIndex, params.domId)
          } else if (params.rowspan.maxCol) {
            this.caculateRowspan(params.rowspan.maxCol, params.domId)
          }
        }.bind(this))
      })
      params.rows.subscribe(val => {
        // 确保子组件重绘之后再进行合并单元格，component调用的是后会遇到此问题
        setTimeout(function () {
          ko.tasks.schedule(function () {
            if (params.rowspan.columnIndex) {
              this.caculateRowspanByFields(params.rowspan.columnIndex, params.domId)
            } else if (params.rowspan.maxCol) {
              this.caculateRowspan(params.rowspan.maxCol, params.domId)
            }
          }.bind(this))
        }.bind(this))
      })
    }
  }
  // 判断点击事件是否触发行选中
  isTriggerRowSelect (evt) {
    // 如果点击的是input则不触发
    if (evt.target.tagName === 'INPUT') {
      return false
    }
    if (evt.target.tagName === 'A') {
      return false
    }
    if (evt.target.classList.contains('y-grid-stoprowselect') || evt.target.classList.contains('y-grid-operation') || evt.target.classList.contains('y-select-single')) {
      return false
    }
    return true
  }
  caculateRowspanByFields (indexes, domId) {
    var tab = document.getElementById(domId)
    // val表示单元格的内容
    let val = ''
    let count = 0
    let start = 0
    indexes.forEach(index => {
      // 不同列的合并开始每次需要重置val值
      val = ''
      count = 1
      // 需要减掉用于显示暂无数据的那一行
      for (var i = 0; i < tab.rows.length - 1; i++) {
        // fixed rowspan 在数据切换之后产生的bug
        if (tab.rows[i].cells[index].style.display === 'none') {
          tab.rows[i].cells[index].style.display = 'table-cell'
        }
        // 每次初始化之前要把当前rowSpan重置
        tab.rows[i].cells[index].rowSpan = 1
        // 第一列不需要校验左侧是否被合并了（display === 'none'表示被合并了）
        if (val === tab.rows[i].cells[index].innerHTML) {
          count++
        } else {
          if (count > 1) { // 合并
            start = i - count
            tab.rows[start].cells[index].rowSpan = count
            for (let j = start + 1; j < i; j++) {
              // 被合并的列隐藏
              tab.rows[j].cells[index].style.display = 'none'
            }
            count = 1
          }
          val = tab.rows[i].cells[index].innerHTML
        }
      }
      if (count > 1) { // 合并，最后几行相同的情况下
        start = i - count
        tab.rows[start].cells[index].rowSpan = count
        for (let j = start + 1; j < i; j++) {
          tab.rows[j].cells[index].style.display = 'none'
        }
      }
    })
  }
  // 动态计算rowspan
  caculateRowspan (maxColumns, domId) {
    var tab = document.getElementById(domId)
    var maxCol = maxColumns
    let val = ''
    let count = 0
    let start = 0
    // fix by songhlc 从左边第一列开始判断
    for (var col = 0; col <= maxCol - 1; col++) {
      count = 1
      val = ''
      // 需要减掉用于显示暂无数据的那一行
      for (var i = 0; i < tab.rows.length - 1; i++) {
        // fixed rowspan 在数据切换之后产生的bug
        if (tab.rows[i].cells[col]) {
          if (tab.rows[i].cells[col].style.display === 'none') {
            tab.rows[i].cells[col].style.display = 'table-cell'
          }
          // 每次初始化之前要把当前rowSpan重置
          tab.rows[i].cells[col].rowSpan = 1
          // 第一列不需要校验左侧是否被合并了（display === 'none'表示被合并了）
          if (val === tab.rows[i].cells[col].innerHTML && (col === 0 || tab.rows[i].cells[col - 1].style.display === 'none')) {
            count++
          } else {
            if (count > 1) { // 合并
              start = i - count
              tab.rows[start].cells[col].rowSpan = count
              for (let j = start + 1; j < i; j++) {
                // 被合并的列隐藏
                tab.rows[j].cells[col].style.display = 'none'
              }
              count = 1
            }
            val = tab.rows[i].cells[col].innerHTML
          }
        }
      }
      if (count > 1) { // 合并，最后几行相同的情况下
        start = i - count
        tab.rows[start].cells[col].rowSpan = count
        for (let j = start + 1; j < i; j++) {
          tab.rows[j].cells[col].style.display = 'none'
        }
      }
    }
  }
  methods (params) {
    this.handleMouseOut = (row) => {
      row._hover(false)
      return true
    }
    // mousein
    this.handleMouseIn = (row) => {
      if (row._hover()) return true
      row._hover(true)
      return true
    }
    this.handleClick = (row, evt) => {
      // 如果组织行选中则直接返回不选中任何行
      if (this.forbitRowSelect() || this.forbitRowSelectFn(row)) {
        return false
      }
      // 对于一些输入框不选中
      if (!this.isTriggerRowSelect(evt)) {
        return true
      }
      // todo:需要将选中的数据放入缓存当中或从缓存中剔除
      if (this.isMultiSelect()) {
        let _selected = !row._selected()
        row._selected(_selected)
      } else {
        // 一些单行选中的场景
        this.onRowSelect && this.onRowSelect(row)
      }
      // return true
    }
  }
}
export default Body
