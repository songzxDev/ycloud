/*
* @author: songhlc
* @date: 2017-10-23
* @description: 下拉组件
* */
import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import {lockScrollEffect, resetScrollEffect} from '@/util/scrollable'
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
  // 是否支持清空
  this.clearable = params.clearable || false
  // 是否支持查询
  this.filterable = ko.observable(params.filterable || false)
  // 是否支持多选
  this.multiple = params.multiple || false
  this.width = ko.observable()
  // 是否有更多按钮（一般用于各种参照）
  this.hasmore = params.hasmore || false
  this.handleMore = params.onmore
  // 用于判断是否显示下拉
  this.showDropdown = ko.observable(false)
  // 设置placeholder提示
  this.placeholder = params.placeholder || '请选择'
  // 监听选中值改变
  this.value.subscribe(item => {
    this.selectedLabel(item.label)
    this.selectedValue(item.value)
    this.curValue(item.value)
    this.key(item.label)
  })
  this.filterDataList = ko.observableArray()
  // 选中的文本
  this.selectedLabel = params.label || ko.observable()
  this.selectedValue = params.id || ko.observable()
  this.isKeyDownEffect = false
  this.showDropdown.subscribe(val => {
    if (val) {
      this.isKeyDownEffect = true
      lockScrollEffect()
    } else {
      this.isKeyDownEffect = false
      resetScrollEffect()
    }
  })
  this.curIndex = ko.observable(-1)
  this.scrollTop = ko.observable(0)
  this.resetScrollTop = function (division) {
    this.scrollTop(this.scrollTop() + division)
  }
  this.handleKeyUp = function (data, event) {
    if (this.isKeyDownEffect) {
      var e = event || window.event
      if (e && e.keyCode === 13) { // 按 enter
        this.handleOptClick({value: this.filterDataList()[this.curIndex()]})
        this.curIndex(-1)
      }
      if (e && e.keyCode === 40) { // 按 arrow down
        if (this.curIndex() < this.filterDataList().length - 1) {
          this.curIndex(this.curIndex() + 1)
        }
        // 每7个重新计算一次
        if (this.curIndex() > 0 && this.curIndex() % 6 === 0) {
          this.resetScrollTop(200)
        }
      }
      if (e && e.keyCode === 38) { // 按 arrow up
        if (this.curIndex() > 0) {
          this.curIndex(this.curIndex() - 1)
        }
        // 每7个重新计算一次
        if (this.curIndex() > 0 && this.curIndex() % 6 === 0) {
          this.resetScrollTop(-200)
        }
      }
      // 删除
      if (e && (e.keyCode === 8)) {
        this.showDropdown(true)
      }
    }
  }.bind(this)
  // 用于判断是否显示关闭按钮
  this.showCloseIcon = ko.computed(() => {
    // 支持清空按钮 + 已有选中值
    return this.clearable && (this.selectedLabel() || this.multiValue().length > 0)
  })
  // 是否显示placeholder
  this.showPlaceholder = ko.computed(() => {
    if (this.multiple) {
      return this.multiValue().length === 0
    } else {
      return !this.selectedLabel()
    }
  })
  // filter查询值
  this.key = ko.observable('')
  // 当前选中值
  this.curValue = ko.observable()
  // 点击显示下拉
  this.handleShowDrop = () => {
    this.showDropdown(true)
  }
  // 鼠标移入的时候如果是从后端获取数据，则直接开始查询
  this.handleFocus = () => {
    params.loadData && params.loadData(this.key(), (remoteData) => {
      this.filterDataList(remoteData)
    })
    this.handleShowDrop(true)
  }
  // 显示暂无数据
  this.isNoData = ko.computed(() => {
    return this.filterable() && this.key() && this.filterDataList().length === 0
  })
  // 点击外部收起下拉
  this.clickoutside = () => {
    this.showDropdown(false)
    if (this.value() && this.value().label) {
      this.key(this.value().label)
    } else {
      this.key('')
    }
  }
  // 选中
  this.handleOptClick = (item, evt) => {
    if (!this.multiple) {
      this.value(item.value)
      this.key(item.value.label)
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
  // 在中文输入法期间不触发查询
  let isStartQuery = true
  params.filterable && this.key.subscribe(val => {
    if (isStartQuery) {
      this.startFilter(val)
    }
  })
  // 键盘输入法事件开始 如果在用中文输入法，则输入法期间的文字不触发查询
  this.handleCompositionStart = (data, event) => {
    isStartQuery = false
  }
  // 键盘输入法事件结束
  this.handleCompositionEnd = (data, event) => {
    isStartQuery = true
    this.startFilter(this.key())
  }
  if (params.dataList && params.dataList.subscribe) {
    this.filterDataList(params.dataList())
    params.dataList.subscribe(val => {
      this.filterDataList(val)
    })
  } else {
    this.filterDataList(params.dataList || [])
  }
  this.startFilter = function (key) {
    if (params.loadData) {
      // 从远程查询
      params.loadData(key, (remoteData) => {
        this.filterDataList(remoteData)
      })
    } else {
      let result = []
      if (key !== '') {
        if (params.dataList.subscribe) {
          result = params.dataList().filter(item => {
            return item.label.indexOf(key) >= 0
          })
        } else {
          result = params.dataList.filter(item => {
            return item.label.indexOf(key) >= 0
          })
        }
        this.filterDataList(result)
      } else {
        this.filterDataList(params.dataList.subscribe ? params.dataList() : params.dataList)
      }
    }
  }
  // 点击清空按钮
  this.handlerClear = () => {
    this.value({})
    this.multiValue([])
    this.key('')
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
