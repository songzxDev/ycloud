import ko from 'knockout'
import checkbox from '../../src/components/checkbox/index.js'
import $ from 'jquery'
describe('y-checkbox组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + checkbox.name, {
    viewModel: checkbox.init,
    template: checkbox.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    checkboxDataList: ko.observableArray([{value: 1,label:'男'}, {value: 0,label:'女'}]),
    checkboxValue: ko.observable(1)
  }
  document.body.innerHTML = '<y-checkbox params="dataList:checkboxDataList,value:checkboxValue"></y-checkbox>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(checkbox).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + checkbox.name)).toBe(true);
  })
  it('生成checkbox测试', () => {
    expect($('body').find('.y-checkbox').length > 0).toEqual(true)
  })
  it('hor默认属性设置', () => {
    expect($('body').find('.y-checkbox-hor').length > 0).toEqual(true)
  })
  // todo radio方向测试
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
