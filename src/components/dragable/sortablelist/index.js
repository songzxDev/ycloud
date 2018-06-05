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
      item.dragged && item.dragged(true)
      item.dragging && item.dragging(false)
    })
    params.items(that.items().map(function (item) {
      return item.item
    }))
  }
  this.reorder = (event, dragData, zoneData) => {
    if (dragData !== zoneData.item) {
      var items = zoneData.items
      var zoneDataIndex = items.indexOf(zoneData.item)
      var dragIndex = items.indexOf(dragData)
      dragData.dragging(true)
      if (dragIndex >= 0) {
        items.splice(dragIndex, 1)
      }
      items.splice(zoneDataIndex, 0, dragData)
    }
  }
}
export default {
  name: 'sortablelist',
  init,
  template
}
