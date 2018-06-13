import template from './body.html'
function init (params) {
  this.data = params.data
}

export default {
  name: 'grid-body',
  init,
  template
}
