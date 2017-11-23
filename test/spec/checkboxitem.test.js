import ko from 'knockout'
import comp from '../../src/components/checkbox/checkboxitem.js'
import $ from 'jquery'
describe('y-checkboxitem组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + comp.name, {
    viewModel: comp.init,
    template: comp.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    item: {value: 1,label:'男'},
    valueList: ko.observableArray([1])
  }
  document.body.innerHTML = '<y-checkbox-item params="label: item.label, value: item.value, valueList: valueList"></y-checkbox-item>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(comp).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + comp.name)).toBe(true);
  })
  it('生成checkboxitem测试', () => {
    expect($('body').find('.y-checkbox-item').length > 0).toEqual(true)
  })
  it('默认值设置测试', () => {
    expect($('body').find('.y-checkbox-item').hasClass('y-checkbox-item-checked')).toEqual(true)
  })
  // todo radio方向测试
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
