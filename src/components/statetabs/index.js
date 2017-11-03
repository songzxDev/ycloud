import template from './index.html'
function init (params) {
  this.items = params.items
  this.index = params.index
  this.handler = (msg, _index) => {
    this.index(_index)
    params.handler(msg)
  }
  this.hideNum = params.hideNum || false
}
export default {
  name: 'state-tabs',
  init,
  template
}
