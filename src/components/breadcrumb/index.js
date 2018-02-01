/*
* @author: wangk2
* @date: 2018-02-01
* @description: 面包屑组件
*
* */
import template from './index.html'

function init (params) {
  this.data = params.data
}
export default {
  name: 'breadcrumb',
  init,
  template
}
