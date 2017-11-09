import ko from 'knockout'
import boxcontent from '../../src/components/boxcontent/index.js'
import $ from 'jquery'
describe('box.test.js', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + boxcontent.name, {
    viewModel: boxcontent.init,
    template: boxcontent.template,
    synchronous: true
  })
  //beforeEach(() => {
    ko.cleanNode(document.getElementsByTagName('body')[0])
    let vm = {
      title: ko.observable('test')
    }
    document.body.innerHTML = '<y-boxcontent params="title: title"><span>content</span></y-boxcontent>'
    ko.applyBindings(vm)
  //})
  it("组件注册测试", () => {
    expect(boxcontent).not.toBeNull();
    expect(ko.components.isRegistered(PREFIX + boxcontent.name)).toBe(true);
  });
  var el = $('body').find('.y-box-content')
  it('样式y-box测试', () => {
    expect(el.hasClass('y-box-content')).toEqual(true)
  })
  it('属性title测试', () => {
    var text = el.find('.y-box-content-title')
    expect(text.text()).toEqual('test')
  })
  it('y-box snapshot', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
