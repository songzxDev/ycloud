import ko from 'knockout'
import grid from '../../../src/components/grid/index.js'
import $ from 'jquery'
import kest from '../../utils/kest'
import vm from './viewmodel'
describe('y-grid组件', () => {
  kest.init(grid)
  kest.tpl('<y-grid params="pagination:true,rows:rows,columns:columns"></y-grid>')
  kest.bind(vm)
  it('生成grid测试', () => {
    expect($('body').find('y-pagination').length > 0).toEqual(true)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
