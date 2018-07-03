import template from './bodybasic.html'
import Base from '../../core/base'
import Body from './bodybase'

export default {
  name: 'grid-body-basic',
  init: Base.createViewModel(Body),
  template
}
