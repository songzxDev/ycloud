import template from './cascader-search-iteam.html'
import ko from 'knockout'
import $ from 'jquery'
function init (params) {
  let self = this
  this.parentId = params.parentId
  this.data = params.data
  this.callback = params.callback
  this.mouseover = function (row, event) {
    var tagrget = event.currentTarget
    $(tagrget).siblings('li').find('.cascader-searchboxIteam').hide()
    $(tagrget).find('#cascader-searchboxIteam' + row.id).show()
  }
  this.clickCallbk = function (data) {
    if (self.callback) {
      self.callback(data)
      $('.cascader-searchboxIteam').hide()
    }
  }
}
ko.components.register('y-cascader-search-iteam', {
  viewModel: init,
  template: template
})
