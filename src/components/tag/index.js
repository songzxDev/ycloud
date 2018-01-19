import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.item = params.item
  this.text = params.text
  this.style = params.style
  this.color = params.color || ''
  this.closeable = params.closeable || false
  this.type = params.type || 'default'
  this.active = params.active || ko.observable(false)
  this.typeClass = ko.computed(() => {
    return 'y-tag-' + this.type + ' ' + (this.active() ? 'y-tag-active' : '')
  })
  this.handleClose = params.handleClose
  this.handleClick = () => {
    if (this.type === 'blank' && params.enableActive) {
      this.active(!this.active())
    }
    params.handleClick && params.handleClick(this.item, this.active())
  }
}
export default {
  name: 'tag',
  init,
  template
}
