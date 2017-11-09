import {refmixin} from '@/mixin'
class Base {
  constructor (params) {
    this.$el = params.$el
    refmixin.call(this, params)
    this.initialize(params)
    this.computed(params)
    this.subscribe(params)
    this.methods(params)
    this.created(params)
  }
  initialize (params) {
  }
  computed (params) {
  }
  created (params) {
  }
  subscribe (params) {
  }
  methods (params) {
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
