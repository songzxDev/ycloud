import ko from 'knockout'
if (!ko.when) {
  ko.when = function (predicate, callback, context) {
    var observable = ko.pureComputed(predicate).extend({notify: 'always'})
    var subscription = observable.subscribe(function (value) {
      if (value) {
        subscription.dispose()
        callback.call(context)
      }
    })
    // In case the initial value is true, process it right away
    observable['notifySubscribers'](observable.peek())
    return subscription
  }
}
// 用于判断是否是ObservableArray
if (!ko.isObservableArray) {
  ko.isObservableArray = function (instance) {
    return ko.isObservable(instance) &&
      typeof instance['remove'] === 'function' &&
      typeof instance['push'] === 'function'
  }
}
// 文本显示空值显示成--
if (!ko.bindingHandlers.nullValueDisplay) {
  ko.bindingHandlers.nullValueDisplay = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      return {'controlsDescendantBindings': true}
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      if (valueAccessor() === null || valueAccessor() === undefined || valueAccessor() === '') {
        ko.utils.setTextContent(element, '——')
      } else {
        if (ko.isObservable(valueAccessor())) {
          // valueAccessor()为监听对象
          if (valueAccessor()() === null || valueAccessor()() === undefined || valueAccessor()() === '') {
            ko.utils.setTextContent(element, '--')
          } else {
            ko.utils.setTextContent(element, valueAccessor())
          }
        } else {
          // valueAccessor()为一个值
          ko.utils.setTextContent(element, valueAccessor())
        }
      }
    }
  }
}
