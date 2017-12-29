import grid from '../../../src/components/grid/index.js'
import $ from 'jquery'
import kest from '../../utils/kest'
import vm from './viewmodel'
describe('y-grid组件', () => {
  kest.init(grid)
  kest.tpl('<y-grid params="maxheight:\'200px\', rows:rows, columns:columns"></y-grid>')
  kest.bind(vm)
  it('height 200px', () => {
    expect($('body').find('.y-grid').css('height') == '200px').toEqual(true)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
