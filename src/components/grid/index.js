import template from './index.html'
import ko from 'knockout'
import head from './head'
import body from './body'
const PREFIX = 'y-'
ko.components.register(PREFIX + head.name, {
  viewModel: head.init,
  template: head.template
})
ko.components.register(PREFIX + body.name, {
  viewModel: body.init,
  template: body.template
})
function init (params) {
  this.columns = params.columns
  this.rows = params.rows
  this.isStripe = params.isStripe || false
}
export default {
  name: 'grid',
  init,
  template
}
