import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.item = params.item
  this.text = params.text
  this.closeable = params.closeable || false
  this.type = params.type || 'default'
  this.fill = params.fill || false
  let color = params.color || ''
  this.style = {
    color: color,
    borderColor: '',
    backgroundColor: ''
  }
  if (color) {
    if (this.fill) {
      // 场景的话 基本要么是填充 要么是border
      // 留着border 要不还设置其他样式
      this.style.color = '#FFF'
      this.style.borderColor = color
      this.style.backgroundColor = color
    } else {
      this.style.borderColor = color
      this.style.backgroundColor = '#FFF'
    }
  }
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
