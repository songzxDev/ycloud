import template from './body.html'
import ko from 'knockout'
import td from './td'
// 判断点击事件是否触发行选中
function isTriggerRowSelect (evt) {
  // 如果点击的是input则不触发
  if (evt.target.tagName === 'INPUT') {
    return false
  }
  if (evt.target.tagName === 'A') {
    return false
  }
  if (evt.target.classList.contains('y-grid-operation') || evt.target.classList.contains('y-select-single')) {
    return false
  }
  return true
}
// 动态计算rowspan
function caculateRowspan (maxColumns, domId) {
  var tab = document.getElementById(domId)
  var maxCol = maxColumns
  let val = ''
  let count = 0
  let start = 0
  for (var col = maxCol - 1; col >= 0; col--) {
    count = 1
    val = ''
    // 需要减掉用于显示暂无数据的那一行
    for (var i = 0; i < tab.rows.length - 1; i++) {
      if (val === tab.rows[i].cells[col].innerHTML) {
        count++
      } else {
        if (count > 1) { // 合并
          start = i - count
          tab.rows[start].cells[col].rowSpan = count
          for (let j = start + 1; j < i; j++) {
            tab.rows[j].cells[col].style.display = 'none'
          }
          count = 1
        }
        val = tab.rows[i].cells[col].innerHTML
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
const PREFIX = 'y-'
ko.components.register(PREFIX + td.name, {
  viewModel: td.init,
  template: td.template
})
function init (params) {
  // 为跨页选择做准备
  // let cacheData = []
  this.isDataTable = params.isDataTable
  this.setCellWidth = function () {
    return '200'
  }
  this.expand = params.expand
  this.columns = params.columns
  this.domId = params.domId
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
  this.rows = ko.computed(() => {
    params.rows().forEach((row) => {
      row._hover = ko.observable(false)
      row._disabled = ko.observable(false)
      row._expand = ko.observable(false)
      if (this.isDataTable) {
        // 如果是dataTable设置成计算属性
        row._selected = ko.pureComputed({
          read: function () {
            return row.selected()
          },
          write: function (val) {
            if (val) {
              row.parent.addRowSelect(row)
            } else {
              row.parent.setRowUnSelect(row)
            }
          }
        })
      } else {
        row._selected = ko.observable(false)
      }
      // todo:行是否选中要和cacheData里的数据进行合并
    })
    return params.rows()
  })
  if (params.rowspan) {
    setTimeout(() => {
      caculateRowspan(params.rowspan.maxCol, params.domId)
    })
    params.rows.subscribe(val => {
      caculateRowspan(params.rowspan.maxCol, params.domId)
    })
  }

  // 暂无数据区域的高度
  this.noDataHeight = ko.computed(() => {
    if (params.maxheight === 'auto') {
      return 'auto'
    } else {
      return params.maxheight.replace('px', '') - 150 + 'px'
    }
  })
  this.handleMouseIn = (row) => {
    if (row._hover()) return
    row._hover(true)
  }
  this.handleMouseOut = (row) => {
    row._hover(false)
  }
  this.handleClick = (row, evt) => {
    // 对于一些输入框不选中
    if (!isTriggerRowSelect(evt)) {
      return true
    }
    // todo:需要将选中的数据放入缓存当中或从缓存中剔除
    if (this.isMultiSelect()) {
      let _selected = !row._selected()
      row._selected(_selected)
    }
    // 触发行选中事件
    params.onRowSelect && params.onRowSelect(row)
    return true
  }
}

export default {
  name: 'grid-body',
  init,
  template
}
