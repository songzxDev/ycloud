import template from './body.html'
import ko from 'knockout'
function init (params) {
  this.data = params.data
}

export default {
  name: 'grid-body',
  init,
  template
}
