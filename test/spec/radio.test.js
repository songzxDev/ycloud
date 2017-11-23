import ko from 'knockout'
import radio from '../../src/components/radio/index.js'
import $ from 'jquery'
describe('y-radio组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + radio.name, {
    viewModel: radio.init,
    template: radio.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    radioDataList: ko.observableArray([{value: 1,label:'男'}, {value: 0,label:'女'}]),
    radioValue: ko.observable(1)
  }
  document.body.innerHTML = '<y-radio params="dataList:radioDataList,value:radioValue"></y-radio>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(radio).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + radio.name)).toBe(true);
  })
  it('生成radio测试', () => {
    expect($('body').find('.y-radio').length > 0).toEqual(true)
  })
  it('hor默认属性设置', () => {
    expect($('body').find('.y-radio-hor').length > 0).toEqual(true)
  })
  // todo radio方向测试
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
