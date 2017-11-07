/*
* @author: zjj
* @date: 2017-11-06
* @description: 级联列表组件
* data:
* selectedValue:
* */
import template from './index.html'
import './cascader-search.less'
import './cascader-search-iteam'
import $ from 'jquery'
function init (params) {
  var self = this
  this.data = params.data
  this.callback = params.callback
  this.parentMouseover = function () {
    $('.sub-cascader-searchbox').show()
    return false
  }
  this.parentMouseout = function () {
    $('.sub-cascader-searchbox').hide()
    return false
  }
  this.mouseover = function (row, event) {
    var tagrget = event.currentTarget
    $(tagrget).siblings('li').find('.cascader-searchboxIteam').hide()
    $(tagrget).find('#cascader-searchboxIteam' + row.id).show()
  }
  this.clickCallbk = function (data) {
    if (self.callback) {
      self.callback(data)
      $('.cascader-searchboxIteam').hide(300)
    }
  }
}
export default {
  name: 'cascader-search',
  init,
  template
}
