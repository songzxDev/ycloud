/*
 * @author: songhlc
 * @date: 2018-03-05
 * @description: 详情显示组件
 * */
import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import Base from '../../core/base'
import getLang from '../../i18n'
class Showdetail extends Base {
  initialize (params) {
    this.text = params.text
    this.limitText = params.limitText || params.text
    this.visible = ko.observable(false)
    this.multiple = !!params.multiple
    this.title = getLang('详细')
  }
  computed (params) {
    this.style = ko.computed(() => {
      let style = {}
      if (this.visible()) {
        style.marginRight = '33px'
      }
      return style
    })
  }
  subscribe (params) {
    if (ko.isObservable(this.text)) {
      this.text.subscribe(val => {
        this.computedVisible()
      })
    }
  }
  methods (params) {
    this.computedVisible = () => {
      ko.tasks.schedule(function () {
        var el = this.$el
        if (!this.multiple) {
          var scrollWidth = el.children[0].children[0].scrollWidth
          var offsetWidth = el.children[0].children[0].offsetWidth
          // 有隐藏
          if (scrollWidth > offsetWidth) {
            this.visible(true)
          } else {
            this.visible(false)
          }
        } else {
          var scrollHeight = el.children[0].children[0].scrollHeight
          var offsetHeight = el.children[0].children[0].offsetHeight
          if (scrollHeight > offsetHeight) {
            this.visible(true)
          } else {
            this.visible(false)
          }
        }
      }.bind(this))
    }
  }
  created (params) {
    this.computedVisible()
  }
}
export default {
  name: 'showdetail',
  init: Base.createViewModel(Showdetail),
  template
}
