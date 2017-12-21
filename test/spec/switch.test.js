import ko from 'knockout'
import yswitch from '../../src/components/switch/index.js'
import $ from 'jquery'
describe('y-switch组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + yswitch.name, {
    viewModel: yswitch.init,
    template: yswitch.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    switchChecked: ko.observable(false),
    switchDisabled: ko.observable(false)
  }
  document.body.innerHTML = ' <y-switch params="checked:switchChecked, disabled:switchDisabled "></y-switch>'
  ko.applyBindings(vm)
  var el = $('body')
  it("组件注册测试", () => {
    expect(yswitch).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + yswitch.name)).toBe(true);
  })
  it('生成switch测试', () => {
    expect($('body').find('.y-switch').length > 0).toEqual(true)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
