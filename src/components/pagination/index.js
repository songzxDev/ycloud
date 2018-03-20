import template from './index.html'
import ko from 'knockout'
function init (params) {
  // 外部默认分页默认从0 开始 而分页从1开始显示 所以要添加一个INDEX_DIFF,如果传入startIndex 为1 则差值为0
  const INDEX_DIFF = params.startIndex === 1 ? 0 : 1
  this.pageIndex = ko.computed(() => {
    return params.pageIndex() + INDEX_DIFF
  })
  // 对齐
  this.align = params.align || 'center'
  this.pageSize = params.pageSize
  var _defaultCurPage = params.pageSize() ? {value: params.pageSize(), label: params.pageSize() + ''} : null
  this.curPage = ko.observable(_defaultCurPage || {value: 10, label: '10'})
  this.pageSize.subscribe(val => {
    if (isNaN(val - 0)) {
      console.error('传入的pageSize,必须为数字')
    } else {
      this.curPage({
        value: val - 0,
        label: val.toString()})
    }
  })
  this.totalCount = params.totalCount
  var defaultList = [10, 20, 50, 100]
  if (params.pageSizeList) {
    defaultList = params.pageSizeList
  }
  this.pageList = defaultList.map(item => {
    return {
      value: item,
      label: item + ''
    }
  })
  this.totalPage = ko.computed(() => {
    return Math.ceil(this.totalCount() / this.pageSize())
  })
  this.pageChange = () => {
    // 以前写错了，这里保留旧版代码兼容以前版本
    params.onPageChage && params.onPageChage(this.pageIndex() - INDEX_DIFF, this.pageSize())
    params.onPageChange && params.onPageChange(this.pageIndex() - INDEX_DIFF, this.pageSize())
  }
  this.sizeChange = (page) => {
    this.pageSize(page.value)
    // fix #55 size Change之后要从第一页重新开始
    params.pageIndex(0 + INDEX_DIFF)
    params.onSizeChange && params.onSizeChange(this.pageIndex() - INDEX_DIFF, this.pageSize())
  }
  // 进入某一页
  this.handlePageChange = function (destIndex) {
    params.pageIndex(destIndex - 1)
    this.pageChange()
  }
  // 下一页
  this.handleNext = () => {
    const current = this.pageIndex()
    if (current >= this.totalPage()) {
      return false
    }
    params.pageIndex(params.pageIndex() + 1)
    this.pageChange()
  }
  // 上一页
  this.handlePrev = function () {
    const current = this.pageIndex()
    if (current <= 1) {
      return false
    }
    params.pageIndex(params.pageIndex() - 1)
    this.pageChange()
  }
}

export default {
  name: 'pagination',
  init,
  template
}
