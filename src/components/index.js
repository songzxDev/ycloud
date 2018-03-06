import ko from 'knockout'
import casitem from './casitem'
import cascader from './cascader'
import radio from './radio'
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
import editgrid from './gridedit'
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
import tooltip from './tooltip'
import {notice, $refs} from './base'
import breadcrumb from './breadcrumb'
import showdetail from './showdetail'
import './konewfeature'
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
register(modal)
register(demo)
register(dropdown)
register(yswitch)
register(select)
register(button)
register(radio)
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
register(editgrid)
register(input)
register(datepicker)
register(datetimepicker)
register(statetabs)
register(searchtag)
register(tooltip)
register(breadcrumb)
register(showdetail)
let ycloud = {
  notice,
  $refs
}
export default ycloud
