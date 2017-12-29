import grid from '../../../src/components/grid/index.js'
import $ from 'jquery'
import kest from '../../utils/kest'
import vm from './viewmodel'
describe('y-grid组件', () => {
  kest.init(grid)
  kest.tpl('<y-grid params="isStripe:true, rows:rows, columns:columns"></y-grid>')
  kest.bind(vm)
  it('默认样式测试', () => {
    expect($('body').find('.y-grid-stripe').length >= 0).toEqual(true)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
