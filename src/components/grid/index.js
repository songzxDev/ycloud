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
  this.columns = params.columns || [{title: 'name', field: 'name', hidden: false}, {field: 'id', title: 'id', hidden: false}]
  this.rows = params.rows || [{id: 1, name: '张三'}, {id: 2, name: '张李四'}, {id: 3, name: '张李'}]
  this.isStripe = params.isStripe || false
}
export default {
  name: 'grid',
  init,
  template
}
