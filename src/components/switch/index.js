import template from './index.html'
import ko from 'knockout'
import './switch.css'
function init (params) {
  this.checked = params.checked || ko.observable(false)
  this.callback = params.callback || false
  this.checked.subscribe(val => {
    if (this.callback) {
      this.callback(val)
    }
  })
}
export default {
  name: 'switch',
  init,
  template
}
