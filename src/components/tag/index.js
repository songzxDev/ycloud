import template from './index.html'

function init (params) {
  this.item = params.item
  this.text = params.text
  this.closeable = params.closeable || false
  this.handleClose = params.handleClose
}
export default {
  name: 'tag',
  init,
  template
}
