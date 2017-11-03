import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.model = params.model
  this.label = params.label
  this.visible = params.visible || ko.observable(true)
}

export default {
  name: 'formitem',
  init,
  template
}
