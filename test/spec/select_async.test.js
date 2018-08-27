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
    selectedValue: ko.observable(),
    selectedId: ko.observable(0),
    placeholder: '这是placeholder'
  }
  document.body.innerHTML = '<y-select params="placeholder:placeholder,dataList:DataList,id:selectedId,value:selectedValue"></y-select>'
  ko.applyBindings(vm)
  var el = $('body')
  it('通过id设置默认值', () => {
    var result = $('body').find('.y-select-single').text().trim()
    expect(result).toEqual('女')
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
