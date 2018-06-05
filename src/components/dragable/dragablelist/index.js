import ko from 'knockout'
import 'knockout-dragdrop'
import template from './index.html'
function generateItem (items) {
  items = items || []
  return ([].concat(items)).map((item) => {
    return {
      item: item,
      dragged: item.dragged || ko.observable(true),
      dragging: ko.observable(false)
    }
  })
}
function init (params) {
  this.items = ko.observableArray(generateItem(params.items()))
  params.items.subscribe(items => {
    this.items(generateItem(items))
  })
  this.style = params.style || {}
  this.name = params.name || ('dragable_' + Math.random())
}
export default {
  name: 'dragablelist',
  init,
  template
}
