import template from './body.html'
import Base from '../../core/base'
import Body from './bodybase'

export default {
  name: 'grid-body',
  init: Base.createViewModel(Body),
  template
}
