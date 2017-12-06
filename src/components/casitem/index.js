import template from './index.html'
import ko from 'knockout'

function init (params) {
  this.subList = ko.observableArray([])
  this.data = params.data
  this.isLoading = function (val) {
    if (val) {
      return val()
    } else {
      return false
    }
  }
  this.selectedValue = params.selectedValue
  this.loadData = params.loadData
  this.activeIndex = ko.observable(-1)
  this.casitmevisible = params.casitmevisible
  this.expandChild = (event, data, index) => {
    // 再次点击本节点不刷新数据
    if (this.activeIndex() !== index) {
      if (this.loadData) {
        // 异步加载
        this.subList([])
        this.data().forEach((item) => {
          item.isLoading(false)
        })
        data.isLoading(true)
        this.loadData(data, (childrenData) => {
          data.isLoading(false)
          if (childrenData && childrenData.length > 0) {
            childrenData.forEach((item) => {
              item.isLoading = ko.observable(false)
            })
            data.children = childrenData
            this.subList(childrenData)
          } else {
            this.subList([])
            this.casitmevisible(false)
          }
        })
      } else {
        // 静态数据加载
        if (data.children && data.children.length > 0) {
          this.subList(data.children)
        } else {
          this.subList([])
          this.casitmevisible(false)
        }
      }
      this.activeIndex(index)
      this.selectedValue(data)
    }
  }
}
export default {
  name: 'casitem',
  init,
  template
}
