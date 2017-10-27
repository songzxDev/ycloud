import template from './index.html'
function init (params) {
  this.model = params.model
  this.label = params.label
}

export default {
  name: 'formitem',
  init,
  template
}
