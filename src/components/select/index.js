/*
* @author: songhlc
* @date: 2017-10-23
* @description: 下拉组件
* */
import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import option from './option'
const PREFIX = 'y-'
ko.components.register(PREFIX + option.name, {
  viewModel: option.init,
  template: option.template
})
function init (params) {
  // 选中的值 {value:'',label:''}格式
  this.value = params.value || ko.observable()
  this.multiValue = params.multiValue || ko.observableArray()
  this.value.subscribe(item => {
    this.selectedLabel(item.label)
    this.curValue(item.value)
  })
  // 选中的文本
  this.selectedLabel = ko.observable()
  // 是否支持清空
  this.clearable = params.clearable || false
  // 是否支持查询
  this.filterable = ko.observable(params.filterable || false)
  // 是否支持多选
  this.multiple = params.multiple || false
  this.width = ko.observable()
  // 用于判断是否显示下拉
  this.showDropdown = ko.observable(false)
  // 用于判断是否显示关闭按钮
  this.showCloseIcon = ko.computed(() => {
    // 不是多选 + 支持清空按钮 + 已有选中值
    return !this.multiple && this.clearable && this.selectedLabel()
  })
  // 是否显示placeholder
  this.showPlaceholder = ko.computed(() => {
    if (this.multiple) {
      return this.multiValue().length === 0
    } else {
      return !this.selectedLabel()
    }
  })
  // 设置placeholder提示
  this.placeholder = params.placeholder || '请选择'
  // 用于展示的数据列表
  this.dataList = params.dataList
  // 当前选中值
  this.curValue = ko.observable()
  // 点击显示下拉
  this.handleShowDrop = () => {
    this.showDropdown(true)
  }
  // 点击外部收起下拉
  this.clickoutside = () => {
    this.showDropdown(false)
  }
  // 点击选项
  this.handleOptClick = (item, evt) => {
    if (!this.multiple) {
      this.value(item.value)
      this.showDropdown(false)
    } else {
      var index = this.multiValue.indexOf(item.value)
      if (index >= 0) {
        this.multiValue.splice(index, 1)
      } else {
        this.multiValue.push(item.value)
      }
    }
  }
  // 点击清空按钮
  this.handlerClear = () => {
    this.value({})
  }
  // 点击清空已选择的
  this.handleDeleteSelected = (item) => {
    var index = this.multiValue.indexOf(item.item)
    this.multiValue.splice(index, 1)
  }
}
export default {
  name: 'select',
  init,
  template
}
