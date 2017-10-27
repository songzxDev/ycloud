import ko from 'knockout'
import './index'
console.log('test')
let viewmodel = {
  checked: ko.observable(true),
  checked1: ko.observable(false),
  checked2: ko.observable(true),
  checked3: ko.observable(true),
  switchDisabled: ko.observable(true),
  loading: ko.observable(true),
  b: ko.observable('i am ucloud-ko-fileupload'),
  id: ko.observable('随意绑定一个id'),
  list: ko.observableArray([
    {
      id: 1,
      title: '2'

    },{
      id: 2,
      title: '3'
    },
    {
      id: 3,
      title: '北京'

    },{
      id: 4,
      title: '上海'
    },
    {
      id: 5,
      title: '天津'

    },{
      id: 6,
      title: '河北'
    }
  ]),
  boxtitle: 'box and boxcontent',
  isShow: ko.observable(false),
  singleselect: ko.observable(),
  multiselect: ko.observableArray(),
  clickoutside: function () {
    viewmodel.isShow(false)
  },
  showdropdown: function () {
    viewmodel.isShow(!viewmodel.isShow())
  },
  handleClose: function (item) {
    console.log(item)
  },
  callback: function(val) {
    debugger
  },
  _console: function() {
    console.log(11)
  },
  formData: {title: ko.observable('')},
  showModal: function () {
    viewmodel.modalVisible(true)
  },
  modalVisible: ko.observable(false),
  selectList: ko.observableArray([
    {value:1,label:'北京'},
    {value:2,label:'上海'},
    {value:3,label:'天津'},
    {value:4,label:'附件'},
    {value:5,label:'超过二十个字的参照超过二十个字的参照超过二十个字的参照'},
    {value:5,label:'Ablee'},
    {value:6,label:'Blaskdf'},
    {value:7,label:'cliskdf'},
    {value:8,label:'阿斯蒂芬卡拉卡减肥啦时代峻峰5'},
    {value:9,label:'阿斯蒂芬卡拉卡减肥啦时代峻峰6'},
    {value:10,label:'阿斯蒂芬卡拉卡减肥啦时代峻7峰'},
    {value:11,label:'等等9912.。想，'}])
}
setTimeout(() => {
  viewmodel.loading(!viewmodel.loading())
}, 3000)
// 打印每次单选的内容
viewmodel.singleselect.subscribe(function (item) {
  console.log('单选：')
  console.log(item)
})
viewmodel.multiselect.subscribe(function (items) {
  console.log('多选：')
  console.log(items)
})
ko.applyBindings(viewmodel, document.getElementById('app'))
