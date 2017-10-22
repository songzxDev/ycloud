import ko from 'knockout'
import './index'
import '@/components/index.less'
console.log('test')
let viewmodel = {
  b: ko.observable('i am ucloud-ko-fileupload'),
  id: ko.observable('随意绑定一个id'),
  list: ko.observableArray([
    {
      id: 1,
      title: '2'

    },{
      id: 2,
      title: '3'
    }
  ]),
  isShow: ko.observable(false),
  clickoutside: function () {
    viewmodel.isShow(false)
  },
  showdropdown: function () {
    viewmodel.isShow(!viewmodel.isShow())
  }
}
ko.applyBindings(viewmodel, document.getElementById('app'))
