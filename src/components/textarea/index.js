import template from './index.html'
import ko from 'knockout'
import Base from '../../core/base'
class Textarea extends Base {
  initialize (params) {
    this.value = params.value || ko.observable()
    // textarea的行，默认两行
    this.rows = params.rows || '2'
    this.placeholder = params.placeholder || ''
    this.maxlength = params.maxlength
    this.disabled = params.disabled || ko.observable(false)
    // textarea是否可以自动变高，如果参数为‘true’则可以，默认不可以
    this.autoHeightChange = params.autoHeightChange || false
  }
  methods (params) {
    this.onInput = (a, b) => {
      if (this.autoHeightChange === 'true') {
        var el = b.target
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
        el.style.overflowY = 'hidden'
      }
    }
    this.onClick = (a, b) => {
      if (this.autoHeightChange) {
        var el = b.target
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
        el.style.overflowY = 'hidden'
      }
    }
    this.onBlur = (a, b) => {
      if (this.autoHeightChange) {
        var el = b.target
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
        el.style.overflowY = 'hidden'
      }
    }
  }
}
export default {
  name: 'textarea',
  init: Base.createViewModel(Textarea),
  template
}
