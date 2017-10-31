import template from './index.html'
function init (params) {
  this.type = params.type || 'text'
  this.value = params.value
}

export default {
  name: 'input',
  init,
  template
}
