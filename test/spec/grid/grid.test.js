import ko from 'knockout'
import grid from '../../../src/components/grid/index.js'
import $ from 'jquery'
import kest from '../../utils/kest'
import vm from './viewmodel'
describe('y-grid组件', () => {
  kest.init(grid)
  kest.tpl('<y-grid params="rows:rows,columns:columns,style:{backgroundColor:\'red\',overflow:\'auto\'}"></y-grid>')
  kest.bind(vm)
  it("组件注册测试", () => {
    expect(grid).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + grid.name)).toBe(true);
  })
  it('生成grid测试', () => {
    expect($('body').find('.y-grid').length > 0).toEqual(true)
    expect($('body').find('.y-grid-wrapper').length > 0).toEqual(true)
  })
  it('默认样式测试', () => {
    expect($('body').find('.y-grid-noborder').length == 0).toEqual(true)
    expect($('body').find('.y-grid-separate').length == 0).toEqual(true)
  })
  it('grid height:默认值', () => {
    expect($('body').find('.y-grid').css('height') == '486px').toEqual(true)
  })
  it('grid wrapper 自定义样式设置', () => {
    expect($('body').find('.y-grid-wrapper').css('background-color') == 'red').toEqual(true)
    expect($('body').find('.y-grid-wrapper').css('overflow') == 'auto').toEqual(true)
  })

  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
