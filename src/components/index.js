import demo from './demo'

function register (model) {
  var name = model.name
  var path = model.path || model.name
  ko.components.register(name, {
    viewModel: model.init,
    template: model.template
  })
}
register(demo)
