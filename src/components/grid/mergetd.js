import template from './mergetd.html'
import Base from '../../core/base'
import util from './gridutil'
class Mergetd extends Base {
  initialize (params) {
    /*
    * like this [col,col,col]
    * */
    this.dataList = params.dataList
    this.row = params.row
    this.defaultFormatText = util.defaultFormatText
  }
}
export default {
  name: 'grid-merge-td',
  init: Base.createViewModel(Mergetd),
  template
}
