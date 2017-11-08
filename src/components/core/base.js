import {refmixin} from '@/mixin'
class Base {
  constructor (params) {
    this.$el = params.$el
    refmixin.call(this, params)
    this.initialize(params)
  }
  initialize (params) {
  }
  static createViewModel (Component) {
    return {
      createViewModel: function (params, componentInfo) {
        params.$el = componentInfo.element
        return new Component(params)
      }
    }
  }
}
export default Base
