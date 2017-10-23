import ko from 'knockout'
import './index'
console.log('test')
let viewmodel = {
  checked: ko.observable(true),
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
  },
  callback: function(val) {
    debugger
  },
  selectList: ko.observableArray([{value:1,label:'1'},{value:2,label:'2'}])
}
ko.applyBindings(viewmodel, document.getElementById('app'))
