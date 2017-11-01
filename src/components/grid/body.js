import template from './body.html'
import ko from 'knockout'
function init (params) {
  // 为跨页选择做准备
  // let cacheData = []
  this.isDataTable = params.isDataTable
  this.setCellWidth = function () { return '200' }
  this.columns = params.columns
  this.rows = ko.computed(() => {
    params.rows().forEach(function (row) {
      row._hover = ko.observable(false)
      row._selected = ko.observable(false)
      // todo:行是否选中要和cacheData里的数据进行合并
    })
    return params.rows()
  })
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
  this.handleClick = (row) => {
    // todo:需要将选中的数据放入缓存当中或从缓存中剔除
    row._selected(!row._selected())
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
