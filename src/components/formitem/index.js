import template from './index.html'
import ko from 'knockout'
function init (params) {
  this.model = params.model
  this.label = params.label
  this.visible = params.visible || ko.observable(true)
  this.validate = ko.computed(() => {
    if (params.vMap) {
      let filteList = params.vMap().filter((item) => {
        return item.key === params.vKey
      })
      return filteList.length > 0
    } else {
      return false
    }
  })
}

export default {
  name: 'formitem',
  init,
  template
}
