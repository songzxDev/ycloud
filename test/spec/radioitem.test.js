import ko from 'knockout'
import radioitem from '../../src/components/radio/radioitem.js'
import $ from 'jquery'
describe('y-radioitem组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + radioitem.name, {
    viewModel: radioitem.init,
    template: radioitem.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    item: {value: 1,label:'男'},
    currentValue: ko.observable(1),
    radioname: 'y-radio-' + 123
  }
  document.body.innerHTML = '<y-radio-item params="radioname: radioname, value: item, currentValue: currentValue"></y-radio-item>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(radioitem).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + radioitem.name)).toBe(true);
  })
  it('生成radioitem测试', () => {
    expect($('body').find('.y-radio-item').length > 0).toEqual(true)
  })
  it('radioitem默认值设置', () => {
    expect($('body').find('.y-radio-item').hasClass('y-radio-item-checked')).toEqual(true)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
