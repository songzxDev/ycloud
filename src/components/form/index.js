import template from './index.html'
function init (params) {
  this.model = params.model
  this.labelWidth = params.labelWidth || '80px'
  this.textAlignCls = (params.labelAlign || 'right') === 'right' ? 'y-form-text-right' : 'y-form-text-left'
}

export default {
  name: 'form',
  init,
  template
}
