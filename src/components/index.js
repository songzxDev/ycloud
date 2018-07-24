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
import formview from './formview'
import grid from './grid'
import editgrid from './gridedit'
import childgrid from './gridchild'
import basicgrid from './gridbasic'
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
import {notice, $refs, loading} from './base'
import breadcrumb from './breadcrumb'
import showdetail from './showdetail'
import poptip from './poptip'
import sortablelist from './dragable/sortablelist'
import dragablelist from './dragable/dragablelist'
import textarea from './textarea'
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
register(childgrid)
register(basicgrid)
register(input)
register(datepicker)
register(datetimepicker)
register(statetabs)
register(searchtag)
register(tooltip)
register(breadcrumb)
register(showdetail)
register(formview)
register(poptip)
register(sortablelist)
register(dragablelist)
register(textarea)
let ycloud = {
  notice,
  $refs,
  loading
}
// 3.5.0-rc版本开始 breaking change,所以ycloud要适配老版本的代码需要添加参数
if (ko.options && ko.options.createChildContextWithAs !== undefined) {
  ko.options.createChildContextWithAs = true
}
export default ycloud
