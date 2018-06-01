import ko from 'knockout'
import 'knockout-dragdrop'
import template from './index.html'
function generateItem (items) {
  items = items || []
  return ([].concat(items)).map((item) => {
    return {
      item: item,
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
  this.name = params.name || ('sortable_' + Math.random())
  this.dragStart = item => {
    item.dragging(true)
  }
  this.dragEnd = item => {
    item.dragging(false)
    params.items(this.items().map(item => {
      return item.item
    }))
  }
  var that = this
  this.drop = () => {
    that.items().forEach(item => {
      item.dragging && item.dragging(false)
    })
  }
  this.reorder = (event, dragData, zoneData) => {
    if (dragData !== zoneData.item) {
      var items = zoneData.items
      var zoneDataIndex = items.indexOf(zoneData.item)
      var dragIndex = items.indexOf(dragData)
      if (dragIndex >= 0) {
        items.splice(dragIndex, 1)
      }
      dragData.dragging(true)
      items.splice(zoneDataIndex, 0, dragData)
    }
  }
}
export default {
  name: 'sortablelist',
  init,
  template
}
