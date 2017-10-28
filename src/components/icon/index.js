/*
* @author: liuxu7
* @date: 2017-10-25
* @description: 按钮组件
* type: glyphicons类名
* size: 图标大小
* color: 图标颜色
* padding: 图标内间距
* */
import template from './index.html'

function init (params) {
  const PREFIX = 'glyphicon-'
  this.type = params.type ? (PREFIX + params.type) : ''
  this.size = (params.size || '') + 'px'
  this.color = params.color || '#333'
  let padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  if (typeof params.padding === 'object') {
    for (var key in params.padding) {
      padding[key] = params.padding[key]
    }
    this.padding = `${padding.top} ${padding.right} ${padding.bottom} ${padding.left} `
  } else {
    debugger
    this.padding = params.padding
  }
}
export default {
  name: 'icon',
  init,
  template
}
