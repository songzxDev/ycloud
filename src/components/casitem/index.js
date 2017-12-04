import template from './index.html'
import ko from 'knockout'

function init (params) {
  this.subList = ko.observableArray([])
  this.data = params.data
  this.selectedValue = params.selectedValue
  this.loadData = params.loadData
  this.activeIndex = ko.observable(-1)
  this.casitmevisible = params.casitmevisible
  this.expandChild = (data, index) => {
    // if (this.loadData) {
    //   await this.loadData(data)
    // }
    this.activeIndex(index)
    if (data.children) {
      this.subList(data.children)
    } else {
      this.subList([])
      this.casitmevisible(false)
    }
    this.selectedValue(data)
  }
}
export default {
  name: 'casitem',
  init,
  template
}
