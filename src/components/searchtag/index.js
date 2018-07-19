import template from './index.html'
import $ from 'jquery'
import ko from 'knockout'
import getLang from '../../i18n'
function computedHeight (element) {
  this.height = $(element).find('.y-searchtag-ctn').height()
  if (this.height > 30) {
    this.showMore(true)
  } else {
    this.showMore(false)
  }
}
function _init (params, el) {
  let _el = el.element
  this.tagList = params.tagList
  this.tagList.subscribe(val => {
    setTimeout(() => {
      // 确保渲染完再计算
      computedHeight.call(this, _el)
    }, 100)
  })
  this.titleKey = params.titleKey || 'title'
  this.height = 'auto'
  this.showMore = ko.observable(false)
  this.enableActive = params.enableActive || false
  this.expandMore = ko.observable(false)
  this.operation = ko.observable(getLang('展开'))
  this.style = ko.computed(() => {
    if (this.expandMore()) {
      return {
        height: this.height + 'px'
      }
    } else {
      return {
        height: '30px'
      }
    }
  })
  this.handleMoreClick = () => {
    this.expandMore(!this.expandMore())
    if (this.expandMore()) {
      this.operation(getLang('收起'))
    } else {
      this.operation(getLang('展开'))
    }
  }
  setTimeout(() => {
    computedHeight.call(this, _el)
  }, 100)
}
var init = {
  createViewModel: function (params, componentInfo) {
    return new _init(params, componentInfo)
  }
}
export default {
  name: 'searchtag',
  init,
  template
}
