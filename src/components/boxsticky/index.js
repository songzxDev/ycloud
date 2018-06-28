/*
 * 参考 https://github.com/garand/sticky/blob/master/jquery.sticky.js实现
 * */
import $ from 'jquery'
import template from './index.html'
import Base from '@/core/base'
var o = {
  currentTop: null,
  topSpacing: 0,
  className: 'is-sticky'
}
window.isRecomputeActiveAnchor = true

class Boxsticky extends Base {
  initialize (params) {
    this.title = params.title
    let stickyElement = $(this.$el).find('.y-box-sticky')
    var stickyWrapper = stickyElement.parent()
    o.stickyElement = stickyElement
    o.stickyWrapper = stickyWrapper
    o = $.extend({}, o, params)
    var timeout = null
    stickyElement.delegate('.sticky-anchor', 'click', function () {
      if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
        var target = $(this.hash)
        $('.sticky-anchor').removeClass('active')
        $(this).addClass('active')
        // 至于滚轮滚动的时候才会触发 鼠标点击上面不会触发
        window.isRecomputeActiveAnchor = false
        // 快速点击时清除之前的定时器
        if (timeout) {
          clearTimeout(timeout)
        }
        // 2s后方便鼠标滚轮事件触发
        timeout = setTimeout(function () {
          window.isRecomputeActiveAnchor = true
        }, 2000)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html, body').animate({
            // 改成更合适的高度
            scrollTop: target.offset().top - 50
          }, 1000)
          return false
        }
      }
    })
  }
  methods (params) {
    var anchor = null
    var anchorlist = []
    var cachedOffsetTop = {}
    var cachedHeight = 0
    var outerHeight = 0
    var wrapperOuterHeight = 0
    var outterOffsetTop = 0
    this.scroller = function () {
      // 如果不存在元素
      if (!anchor) {
        anchor = $('.sticky-anchor')
        anchor.each(function () {
          anchorlist.push($(this).attr('href'))
        })
      }
      let documentHeight = $(document).height()
      let scrollTop = $(window).scrollTop()
      let windowHeight = $(window).height()
      // 至于滚轮滚动的时候才会触发 鼠标点击上面不会触发
      if (window.isRecomputeActiveAnchor) {
        anchorlist.forEach(function (item) {
          if (documentHeight !== cachedHeight) {
            cachedOffsetTop[item] = $(item).offset().top
          }
          let pos = cachedOffsetTop[item] - scrollTop
          // 确保滚轮滚动时 会定位到相应的选项
          if (pos - windowHeight / 2 < 50) {
            var anchorItem = $('.sticky-anchor[href="' + item + '"]')
            if (!(anchorItem.hasClass('active'))) {
              $('.sticky-anchor').removeClass('active')
              anchorItem.addClass('active')
            }
          }
        })
        cachedHeight = documentHeight
      }
      if (!outerHeight) {
        outerHeight = o.stickyElement.outerHeight()
      }
      // update height in case of dynamic content
      o.stickyWrapper.css('height', outerHeight)

      let dwh = documentHeight - windowHeight
      let extra = (scrollTop > dwh) ? dwh - scrollTop : 0
      let elementTop = wrapperOuterHeight || o.stickyWrapper.offset().top
      wrapperOuterHeight = elementTop
      let etse = elementTop - o.topSpacing - extra
      if (scrollTop <= etse) {
        if (o.currentTop !== null) {
          o.stickyElement
            .css({
              'width': '',
              'position': '',
              'top': '',
              'z-index': ''
            })
          o.stickyElement.parent().removeClass(o.className)
          o.currentTop = null
        }
      } else {
        var newTop = documentHeight - outerHeight - o.topSpacing - o.bottomSpacing - scrollTop - extra
        if (newTop < 0) {
          newTop = newTop + o.topSpacing
        } else {
          newTop = o.topSpacing
        }
        if (o.currentTop !== newTop) {
          var newWidth
          if (newWidth == null) {
            newWidth = o.stickyElement.outerWidth()
          }
          o.stickyElement
            .css('width', newWidth)
            .css('position', 'fixed')
            .css('top', newTop)
            .css('z-index', o.zIndex)

          o.stickyElement.parent().addClass(o.className)
          o.currentTop = newTop
        }

        // Check if sticky has reached end of container and stop sticking
        var stickyWrapperContainer = o.stickyWrapper.parent()
        var _innerOffsetTop = o.stickyElement.offset().top
        var _outterOffsetTop = outterOffsetTop || stickyWrapperContainer.offset().top
        outterOffsetTop = _outterOffsetTop
        var unstick = (_innerOffsetTop + outerHeight >= _outterOffsetTop + stickyWrapperContainer.outerHeight()) && (_innerOffsetTop <= o.topSpacing)
        if (unstick) {
          o.stickyElement
            .css({
              'position': 'absolute',
              'top': '',
              'bottom': 0,
              'z-index': ''
            })
        } else {
          o.stickyElement.css({
            'position': 'fixed',
            'top': newTop,
            'bottom': '',
            'z-index': o.zIndex
          })
        }
      }
    }
  }
  created (params) {
    if (window.addEventListener) {
      window.addEventListener('scroll', this.scroller, false)
      // TODO 浏览器窗口resize的时候也需要重新计算
      // window.addEventListener('resize', resizer, false)
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', this.scroller)
      // window.attachEvent('onresize', resizer)
    }
    setTimeout(this.scroller, 0)
  }
}

export default {
  name: 'boxsticky',
  init: Base.createViewModel(Boxsticky),
  template
}
