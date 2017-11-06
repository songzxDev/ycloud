import template from './radioitem.html'
import ko from 'knockout'
import _ from 'lodash'
function init (params) {
  this.label = params.label
  this.value = params.value
  this.parent = params.parent()
  this.checked = params.checked || ko.observable(false)
  this.change = (data) => {
    _.forEach(data.parent,(v,k)=>{
      debugger
      if(v.value == data.value){
        this.checked(true)
      }else{
        this.checked(false)
      }
    })
    
  }
}
export default {
  name: 'radio-item',
  init,
  template
}
