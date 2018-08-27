import ko from 'knockout'
import Select from '../../src/components/select/index.js'
import $ from 'jquery'
describe('y-select组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + Select.name, {
    viewModel: Select.init,
    template: Select.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    DataList: ko.observableArray([{value: 1,label:'男'}, {value: 0,label:'女'}]),
    checkboxValue: ko.observableArray([1]),
    selectedValue: ko.observable({value: 1, label: '男'}),
    selectedId: ko.observable(''),
    placeholder: '这是placeholder'
  }
  document.body.innerHTML = '<y-select params="placeholder:placeholder,dataList:DataList,id:selectedId,value:selectedValue"></y-select>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(Select).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + Select.name)).toBe(true);
  })
  it('生成select测试', () => {
    expect($('body').find('.y-select-ctn').length > 0).toEqual(true)
  })
  it('验证placeholder', () => {
    expect($('body').find('.y-select-placeholder').text().trim()).toEqual(vm.placeholder)
  })
  it('通过value设置默认值', () => {
    expect($('body').find('.y-select-single').text().trim()).toEqual(vm.selectedValue().label)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
