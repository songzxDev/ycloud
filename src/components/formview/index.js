import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.label = params.label
  this.style = params.style
  this.visible = params.visible || ko.observable(true)
}

export default {
  name: 'formview',
  init,
  template
}
