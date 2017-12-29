import ko from 'knockout'
import boxcontent from '../../src/components/boxcontent/index.js'
import $ from 'jquery'
import kest from '../utils/kest'
describe('y-box-content组件', () => {
  const PREFIX = 'y-'
  kest.init(boxcontent)
  kest.tpl('<y-boxcontent params="title: title"><span>content</span></y-boxcontent>')
  kest.bind({
    title: ko.observable('test')
  })
  var el = $('body').find('.y-box-content')
  it('内部样式测试', () => {
    expect(el.hasClass('y-box-content')).toEqual(true)
    expect(el.find('.y-box-content-title').length > 0).toEqual(true)
  })
  it('属性title测试', () => {
    var text = el.find('.y-box-content-title')
    expect(text.text()).toEqual('test')
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
