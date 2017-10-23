import template from './option.html'

function init (params) {
  this.value = params.value
  this.label = params.label || 'label'
  this.key = params.key || 'value'
  this.labelsecond = params.labelsecond || ''
  this.itemClick = params.itemClick
}
export default {
  name: 'option',
  init,
  template
}
