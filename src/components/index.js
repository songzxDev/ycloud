import ko from 'knockout'
import demo from './demo'
import dropdown from './dropdown'
import yswitch from './switch'
import tag from './tag'
import select from './select'
import button from './button'

const PREFIX = 'y-'
function register (model) {
  ko.components.register(PREFIX + model.name, {
    viewModel: model.init,
    template: model.template
  })
}
register(demo)
register(dropdown)
register(yswitch)
register(select)
register(button)
register(tag)
