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
  this.curPage = ko.observable(params.curPage || {value: 10, label: '10'})
  this.totalCount = params.totalCount
  this.pageList = [
    {
      value: 8,
      label: '8'
    },
    {
      value: 10,
      label: '10'
    }, {
      value: 20,
      label: '20'
    }, {
      value: 50,
      label: '50'
    }, {
      value: 100,
      label: '100'
    }
  ]
  this.totalPage = ko.computed(() => {
    return Math.ceil(this.totalCount() / this.pageSize())
  })
  this.pageChange = () => {
    params.onPageChage && params.onPageChage(this.pageIndex() - INDEX_DIFF, this.pageSize())
  }
  this.sizeChange = (page) => {
    this.pageSize(page.value)
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
