import ko from 'knockout'
import box from './box'
import boxcontent from './boxcontent'
import boxfilter from './boxfilter'
import boxsticky from './boxsticky'
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
register(box)
register(boxcontent)
register(boxfilter)
register(demo)
register(dropdown)
register(yswitch)
register(select)
register(button)
register(tag)
register(boxsticky)
