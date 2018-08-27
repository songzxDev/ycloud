import ko from 'knockout'
import 'ko-bindinghandler'
import comp from '../../src/components/dropdown/index.js'
import $ from 'jquery'
describe('y-dropdown组件', () => {
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
    dataList: ko.observableArray([{value: 1, label: 'label1'}, {value: 2, label: 'label2'}]),
    isShow: ko.observable(true)
  }
  document.body.innerHTML = '<y-dropdown params="width:300, isShow:isShow, isStopTransferDom: true"><div data-bind="foreach:$parent.dataList">' +
      '<div class="mytestClass" data-bind="text:$data.label"></div>'
    '</div></y-dropdown>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(comp).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + comp.name)).toBe(true);
  })
  it('验证width参数', () => {
    expect($('body').find('.y-dropdown').css('width')).toEqual('300px')
  })
  it("测试数据内容多次渲染", () => {
    var el = $('body').find('.mytestClass')
    var value = el.eq(0).text().trim()
    expect(value).toEqual(vm.dataList()[0].label)
    var value2 = el.eq(1).text().trim()
    expect(value2).toEqual(vm.dataList()[1].label)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
