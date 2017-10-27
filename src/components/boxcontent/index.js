import template from './index.html'
function init (params) {
  this.title = params.title
  this.vm = params.vm
}

export default {
  name: 'boxcontent',
  init,
  template
}
