import ko from 'knockout'
const PREFIX = 'y-'
let jest = {
  init (component) {
    ko.components.register(PREFIX + component.name, {
      viewModel: component.init,
      template: component.template,
      synchronous: true
    })
    ko.cleanNode(document.getElementsByTagName('body')[0])
  },
  tpl (html) {
    document.body.innerHTML = html
  },
  bind (vm) {
    ko.applyBindings(vm)
  }
}
export default jest
