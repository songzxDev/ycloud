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
  cascaderData: ko.observableArray([
    {
      id: 1,
      name: '1',
    }, {
      id: 2,
      name: '有下级',
      children: [
        {
          id:3,
          name: '4',
        }, {
          id:4,
          name: '有下级',
          children: [
            {
              id:5,
              name: '4',
            }, {
              id:6,
              name: '有下级',
              children: [
                {
                  id:7,
                  name: '4',
                }, {
                  name: '有下级',
                }
              ]
            }
          ]
        }
      ]
    }, {
      id:8,
      name: '3',
    }
  ]),
  cascaderValue: ko.observable({name: '', id: ''}),
  list: ko.observableArray([
    {
      id: 1,
      title: '1'

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
  treeData: ko.observable([{
    id: 1, name: '北京总公司', children: [
      {
        id: 2, name: '上海分公司', children: []
      },
      {
        id: 3, name: '福建分公司', children: [
          {
            id: 4, name: '福州分公司', children: []
          },
          {
            id: 5, name: '厦门分公司', children: []
          }
        ]
      }
    ]
  }]),
  modalVisible: ko.observable(false),
  treeSelectedData: ko.observable(''),
  onTreeSelect: function (data) {
    viewmodel.treeSelectedData(JSON.stringify(data))
  },
  loadTreeData: function (params, cb) {
    if (params.name !== 'nodeadd') {
      setTimeout(()=> {
        cb([{id:Math.random(),name:'nodeadd'}, {id:Math.random(),name:'nodeadd2'}])
      }, 500)

    } else {
      cb(null)
    }
  },
  asyncTreeData: ko.observableArray([]),
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
setTimeout(() => {
  viewmodel.asyncTreeData([{id: 1, name: '北京总公司'}])
}, 500)
