import template from './index.html'
import gridTemplate from './gridtemplate.html'
import ko from 'knockout'
import head from './head'
import body from './body'
import bodybasic from './bodybasic'
import megertd from './mergetd'
import operation from './operation'
import Base from '../../core/base'
import Grid from './base'
const PREFIX = 'y-'
ko.components.register(PREFIX + head.name, {
  viewModel: head.init,
  template: head.template
})
ko.components.register(PREFIX + body.name, {
  viewModel: body.init,
  template: body.template
})
ko.components.register(PREFIX + megertd.name, {
  viewModel: megertd.init,
  template: megertd.template
})
ko.components.register(PREFIX + operation.name, {
  viewModel: operation.init,
  template: operation.template
})
ko.components.register(PREFIX + bodybasic.name, {
  viewModel: bodybasic.init,
  template: bodybasic.template
})
if (!document.getElementById('y-template-noType')) {
  document.body.innerHTML = document.body.innerHTML + gridTemplate
}
export default {
  name: 'grid',
  init: Base.createViewModel(Grid),
  template: template
}
