import template from './index.html'
function init (params) {
  this.title = params.title
}

export default {
  name: 'boxcontent',
  init,
  template
}
