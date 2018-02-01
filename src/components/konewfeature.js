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
