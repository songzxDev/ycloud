/*
* @author: songhlc
* @date: 2017-10-23
* @description: 下拉组件
* */
import template from './index.html'
import ko from 'knockout'
import 'ko-bindinghandler'
import {lockScrollEffect, resetScrollEffect} from '../../util/scrollable'
import option from './option'
import Base from '../../core/base'
import $ from 'jquery'
import getLang from '../../i18n'
const PREFIX = 'y-'
ko.components.register(PREFIX + option.name, {
  viewModel: option.init,
  template: option.template
})

class Select extends Base {
  initialize (params) {
    // 单选绑定value
    this.value = params.value || ko.observable()
    // 多选选中值绑定multiValue
    this.multiValue = params.multiValue || ko.observableArray()
    // 格式换要求 通常要求传入的格式是 {label:'xx',value:'xx'} 但实际用户的数据格式未知，
    // 所以可以自定义传入labelkey 和valuekey
    this.labelkey = params.labelkey || 'label'
    this.valuekey = params.valuekey || 'value'
    this.dropWidth = params.dropWidth
    // 是否支持清空
    this.clearable = params.clearable || false
    // 是否支持查询
    this.filterable = ko.observable(params.filterable || false)
    // 是否支持多选
    this.multiple = params.multiple || false
    // 是否有更多按钮（一般用于各种参照）
    this.hasmore = params.hasmore || false
    // 设置placeholder提示
    this.placeholder = params.placeholder || getLang('请选择')
    // 选中的文本
    this.selectedLabel = params.label || ko.observable()
    this.selectedValue = params.id || ko.observable()
    // 最终用于显示的过滤完的数据
    this.filterDataList = ko.observableArray()
    // 用于判断是否显示下拉
    this.showDropdown = ko.observable(false)
    // 用于支持键盘上下事件 当前选中内容的索引
    this.curIndex = ko.observable(-1)
    // dropdown 滚动条的高度
    this.scrollTop = ko.observable(0)
    // filter查询值 查询的时候有选中值
    this.key = ko.observable(this.value() ? this.value()[this.labelkey] : '')
    // 当前选中值（单选）
    this.curValue = ko.observable()
    // 是否已经设置过默认值防止重复调用（
    this.hasSetDefault = false
    this.stopLockScroll = params.stopLockScroll || false
    // 是否禁用下拉框，在级联和行可编辑场景均可用到
    this.disabled = params.disabled || ko.observable(false)
    // 用于判断是否要重新查询
    this.oldSearchKey = undefined
    this.isStopTransferDom = params.isStopTransferDom || false
    this.topAdjust = params.topAdjust
  }
  computed (params) {
    // 显示暂无数据
    this.isNoData = ko.computed(() => {
      // 没有数据且包含查询条件 且是可搜索的下拉
      return this.filterable() && this.key() && this.filterDataList().length === 0
    })
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
  }
  subscribe (params) {
    // 监听单选值改变
    this.value.subscribe(item => {
      this.selectedLabel(item[this.labelkey])
      this.selectedValue(item[this.valuekey])
      this.curValue(item[this.valuekey])
      this.key(item[this.labelkey])
      // 另一种场景value 单选默认值设置 vm.value({label:'x',id:'x'})
      if (!this.hasSetDefault) {
        setDefaultValue.apply(this)
      }
    })
    // 如果只绑定了id则需要监听（没有绑定value属性）fix
    if (!params.value) {
      this.selectedValue.subscribe(selectedId => {
        setDefaultValue.apply(this)
      })
    }
    // 多选数据改变
    this.multiValue.subscribe(() => {
      // 另一种场景value 多选默认值设置 vm.value({label:'x',id:'x'})
      if (!this.hasSetDefault) {
        setDefaultValue.apply(this)
      }
    })
    // 下拉展开的时候才接受键盘的上下事件
    this.isKeyDownEffect = false
    // 是否显示下拉
    this.showDropdown.subscribe(val => {
      if (!this.stopLockScroll) {
        if (val) {
          this.isKeyDownEffect = true
          lockScrollEffect() // 显示下拉的时候滚动的时候父容器(body)默认锁定不可滚动
        } else {
          this.isKeyDownEffect = false
          resetScrollEffect() // 收齐下拉的时候滚动的时候父容器（body）可滚动
        }
      }
    })
    // 数据改变时需要重新设置默认值
    this.filterDataList.subscribe(val => {
      setDefaultValue.apply(this)
    })
  }
  methods (params) {
    // 点击更多事件
    this.handleMore = () => {
      this.showDropdown(false)
      params.onmore && params.onmore()
    }
    // 选中数据改变事件 单选多选都会触发给外部回调使用
    this.onChange = params.onChange || function () {}
    // filterable + 键盘上下键的时候需要重新设置滚动高度
    this.resetScrollTop = (division) => {
      this.scrollTop(this.scrollTop() + division)
    }
    this.handleKeyUp = (data, event) => {
      if (this.isKeyDownEffect) {
        var e = event || window.event
        if (e && e.keyCode === 13) { // 按 enter
          var item = this.filterDataList()[this.curIndex()]
          if (item) {
            this.handleOptClick({value: item})
          } else {
            if (this.filterDataList().length > 0) {
              this.handleOptClick({value: this.filterDataList()[0]})
            }
          }
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
    }
    // 点击显示下拉
    this.handleShowDrop = () => {
      if (this.disabled()) {
        return false
      } else {
        this.showDropdown(true)
      }
    }
    // 鼠标移入的时候如果是从后端获取数据，则直接开始查询
    // 需要先判断key是否改变 改变了才重新查询否则每次进来都查询效率低
    this.handleFocus = () => {
      if (this.oldSearchKey !== this.key()) {
        this.oldSearchKey = this.key()
        params.loadData && params.loadData(this.key(), (remoteData) => {
          this.filterDataList(remoteData)
        })
        this.handleShowDrop(true)
      }
    }
    // 点击外部收起下拉
    this.clickoutside = (e) => {
      // 多选的时候 点击option不收起 下拉
      if ($(e.target).parents('.y-option-ctn').length > 0 && this.multiple) {
        return
      }
      this.showDropdown(false)
      if (this.value() && this.value()[this.labelkey]) {
        this.key(this.value()[this.labelkey])
      } else {
        this.key('')
      }
    }
    // 选中事件
    this.handleOptClick = (item) => {
      // enter事件无值情况
      if (item) {
        if (!this.multiple) {
          this.value(item.value)
          this.key(item.value[this.labelkey])
          this.showDropdown(false)
          this.onChange(item.value)
        } else {
          var index = this.multiValue.indexOf(item.value)
          if (index >= 0) {
            this.multiValue.splice(index, 1)
          } else {
            this.multiValue.push(item.value)
          }
          this.onChange(this.multiValue())
        }
      } else {
        return false
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
    // 查询数据过滤客户端+远程
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
              return item[this.labelkey].indexOf(key) >= 0
            })
          } else {
            result = params.dataList.filter(item => {
              return item[this.labelkey].indexOf(key) >= 0
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
      if (this.multiple) {
        this.onChange([])
      } else {
        this.onChange({})
      }
    }
    // 点击清空已选择的
    this.handleDeleteSelected = (item) => {
      var index = this.multiValue.indexOf(item.item)
      this.multiValue.splice(index, 1)
      this.onChange(this.multiValue())
    }
  }
  created (params) {
    // 初始化的时候把dataList值传入filterDataList中 并添加监听
    if (params.dataList && params.dataList.subscribe) {
      this.filterDataList(params.dataList())
      params.dataList.subscribe(val => {
        this.filterDataList(val)
      })
    } else {
      this.filterDataList(params.dataList || [])
    }
    // 两种场景 如果传入的value是ko.observable({label: '男',value: 1})这种，就要一开始就设置默认值
    // 另一种场景在value 监听改变事件里设置
    setDefaultValue.apply(this)
  }
}
// 思路 根据filterDataList里的值重写label 重新setValue里的值
function setDefaultValue () {
  // 设置默认值 通常用于修改页面 todo 需要重构 还要支持value值异步设置
  // 多选
  if (this.multiple) {
    // 有值才查询
    if (this.multiValue().length > 0 && this.filterDataList().length > 0) {
      // 如果存在old值（old值可能内容比查询出列表里的值少，比如除了value,label还有一些其他的字段）
      // 则需要进行过滤后重新赋值
      // 这里考虑到filterDataList可能是通过loadData服务端动态筛选查询出来的（有些值已选中但不在当前lodaData返回的列表里）
      // 所以需要进行过滤筛选，重新对multiValue赋值
      var _defaultItem = this.multiValue().map(item => {
        let _list = this.filterDataList().filter(data => {
          return item[this.valuekey] === data[this.valuekey]
        })
        // 如果filterDataList（下拉列表中存在）则用下拉的值代替，如果不存在则返回当前值
        if (_list.length > 0) {
          return _list[0]
        } else {
          return item
        }
      })
      if (_defaultItem.length > 0) {
        this.hasSetDefault = true
        this.multiValue(_defaultItem)
      }
    }
  } else { // 单选
    if (this.value() && this.value()[this.valuekey] && this.filterDataList().length > 0) {
      var defaultItem = this.filterDataList().filter(item => {
        if (this.value()) {
          return item[this.valuekey] === this.value()[this.valuekey]
        } else {
          return false
        }
      })
      if (defaultItem.length > 0) {
        this.hasSetDefault = true
        this.selectedLabel(defaultItem[0][this.labelkey])
      }
    } else if (this.selectedValue() !== undefined && this.selectedValue() !== null) { // 单选时有可能是只绑定了id属性，同样需要 fix error #86
      var __defaultItem = this.filterDataList().filter(item => {
        if (this.selectedValue() !== undefined && this.selectedValue() !== null) { // 要支持值为0的情况
          return item[this.valuekey] === this.selectedValue()
        } else {
          return false
        }
      })
      if (__defaultItem.length > 0) {
        this.selectedLabel(__defaultItem[0][this.labelkey])
      }
    }
  }
}
export default {
  name: 'select',
  init: Base.createViewModel(Select),
  template
}
