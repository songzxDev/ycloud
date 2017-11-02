import template from './index.html'
import ko from 'knockout'
function init ({placeholder, data, minDate, maxDate}) {
  this.placeholder = placeholder
  this.data = data
  this.minDate = minDate || ko.observable('1600-01-01')
  this.maxDate = maxDate || ko.observable('2099-12-31')
}
export default {
  name: 'datetimepicker',
  init,
  template
}
