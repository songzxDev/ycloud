import ko from 'knockout'
import casitem from './casitem'
import cascader from './cascader'
import checkbox from './checkbox'
import box from './box'
import boxcontent from './boxcontent'
import boxfilter from './boxfilter'
import boxsticky from './boxsticky'
import button from './button'
import datepicker from './datepicker'
import datetimepicker from './datetimepicker'
import demo from './demo'
import dropdown from './dropdown'
import form from './form'
import formitem from './formitem'
import grid from './grid'
import icon from './icon'
import input from './input'
import modal from './modal'
import pagination from './pagination'
import searchtag from './searchtag'
import select from './select'
import statetabs from './statetabs'
import tag from './tag'
import tree from './tree'
import yswitch from './switch'
import ycloud from './base'
import cascaderSearch from './cascader-search'
const PREFIX = 'y-'
function register (model) {
  ko.components.register(PREFIX + model.name, {
    viewModel: model.init,
    template: model.template
  })
}
register(cascaderSearch)
register(box)
register(boxcontent)
register(boxfilter)
register(modal)
register(demo)
register(dropdown)
register(yswitch)
register(select)
register(button)
register(checkbox)
register(tag)
register(boxsticky)
register(formitem)
register(form)
register(icon)
register(tree)
register(casitem)
register(cascader)
register(pagination)
register(grid)
register(input)
register(datepicker)
register(datetimepicker)
register(statetabs)
register(searchtag)
export default ycloud
