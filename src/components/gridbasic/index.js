import template from './index.html'
import Base from '../../core/base'
import Grid from '../grid/base'
export default {
  name: 'basicgrid',
  init: Base.createViewModel(Grid),
  template: template
}
