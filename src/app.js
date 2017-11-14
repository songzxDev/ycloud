import ko from 'knockout'
import ycloud from './index'
console.log('test')
var dt = new u.DataTable({
  meta:{
    id: "",
    name: "",
    createdate: ""
  }
})
setTimeout(function () {
  dt.setSimpleData([{id:1,name:2,createdate:'2014-01-06'},{id:2,name:1,createdate:'2014-01-06 00:02:03'},{id:3,name:4,createdate:''},{id:3,name:4,createdate:1509610089885}])
  // dt.setAllRowsUnSelect()
}, 1000)
window.dt = dt
let viewmodel = {
  checked: ko.observable(true),
  checked1: ko.observable(false),
  checked2: ko.observable(true),
  checked3: ko.observable(true),
  switchDisabled: ko.observable(true),
  loading: ko.observable(true),
  b: ko.observable('i am ucloud-ko-fileupload'),
  id: ko.observable('随意绑定一个id'),
  oper1: function (row, evt) {
    debugger
  },
  submitFn: function () {
    alert ('submit:' + viewmodel.formData.title())
  },
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
  formValidate: function () {
    var form1 = ycloud.$refs['form1']
    form1.formValidate({}, function (data) {
      debugger
    })
  },
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
  loadSelectData: function (params, cb) {
    if (params) {
      setTimeout(() => {
        cb([{id:'1',personName:'上海'}, {id:'2', personName:'大北京'}])
      }, 500)
    } else {
      cb([{
        email: '',
        enterpriseId: 30,
        id: 31703,
        moblie: '',
        organizationId: 41,
        organizationName: '北京采购部',
        personCode: 'kbczy',
        personName: '开标操作员',
        suporgCode: 'p01',
        suporgName: '1网上商城运营方',
        userId: 889,
        userName: 'newtest'
      }])
    }
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
  htmltemplate: '<div data-bind="text:function(){debugger;}"></div>',
  onPageChange: function (pageIndex, pageSize) {
    debugger
    console.log(pageIndex + ' '+ pageSize)
  },
  columns: ko.observableArray([
    {
      title: '',
      field: '',
      type: 'checkbox',
      hidden: false,
      width: 50
    },
    {
      title: 'component',
      hidden: false,
      width: '20%',
      type: 'component',
      compFn: function (row) {
        return {
          name: 'y-select',
          params: {
            placeholder: '多选下拉',
            dataList: viewmodel.selectList,
            clearable: true,
            label: row.name,
            id: row.id
          }
        }
      }
    },
    {
      field: 'id',
      title: 'renderFn',
      type: 'render',
      hidden: false,
      renderFn: function (row, index) {
        return `<div onclick="clickme(event)" data-id='${row.id()}'>${index + row.name() + row.id() + '通过render函数生成的html片段'}</div>`
      }
    }, {
      field: 'id',
      title: 'operation',
      hidden: false,
      type: 'render',
      renderFn: function (row, index) {
        window.clickme = function (event) {
          console.log(row.id)
        }
        var links = `<a class="y-grid-operation" href="http://www.baidu.com?id=${row.id}">新增</a>
          <a class="y-grid-operation"  href="http://www.baidu.com?id=${row.id}">修改</a>
          <span class="y-grid-operation" onclick="clickme(event)">删除</span>
        `
        return links
      }
    }
  ]),
  columnsdt: [
    {
      title: '',
      field: '',
      type: 'checkbox',
      hidden: false,
      width: 50,
      expandCompFn (row) {
        return {
          name: 'y-grid',
          params: {
            isStripe: true,
            maxheight: 'auto',
            columns:viewmodel.columns,
            rows: viewmodel.rows
          }
        }
      }
    },
    {
      title: '序号',
      width: 70,
      type: 'index'
    },
    {
      title: 'date',
      width: 150,
      field: 'createdate',
      dataType: 'date'
    },
    {
      title: 'datetime',
      width: 200,
      field: 'createdate',
      dataType: 'datetime'
    },
    {
      title: 'y-input',
      hidden: false,
      align: 'left',
      width: '20%',
      type: 'component',
      compFn: function (row) {
        return {
          name: 'y-input',
          params: {
            type: 'text',
            value: row.ref('name'),
            disabled: row._disabled
          }
        }
      }
    },
    {
      title: 'component',
      hidden: false,
      width: '15%',
      type: 'component',
      compFn: function (row) {
        return {
          name: 'y-select',
          params: {
            placeholder: '多选下拉',
            dataList: viewmodel.selectList,
            clearable: true,
            label: row.ref('name'),
            id: row.ref('id')
          }
        }
      }
    },
    {
      field: 'id',
      title: 'renderFn',
      type: 'render',
      hidden: false,
      renderFn: function (row, index) {
        window.evt_setDisabeld = function (rowId) {
          let row = dt.getRowByRowId(rowId)
          row._disabled(!row._disabled())
        }
        return `<div onclick="evt_setDisabeld(${row.rowId})" data-id='${row.getValue('id')}'>${index + row.getValue('name') + row.getValue('id') + '通过render函数生成的html片段'}</div>`
      }
    }, {
      field: 'id',
      title: 'operationList',
      type: 'operation',
      operationList: [
        {
          title: '操作1',
          click: function (row, evt) {
            row._disabled(true)
            return false
          },
          visible: function (row) {
            return !row._disabled()
          }
        }, {
          title: '操作2',
          click: function (row, evt) {
            row._disabled(false)
            return false
          },
          visible: function (row) {
            return row._disabled()
          }
        }, {
          title: '子表',
          click: function (row, evt) {
            row._expand(!row._expand())
            return false
          }
        }
      ]
    }
  ],
  tagClick (item, isActive) {
    console.log(item)
    console.log(isActive)
  },
  tagList: ko.observableArray([{
    title: '深圳',
    value: 1,
    handleClick: function (item, isActive) {
      viewmodel.tagClick(item, isActive)
    }
  }, {
    title: '北京',
    value: 2,
    handleClick: function (item, isActive) {
      viewmodel.tagClick(item, isActive)
    }
  }, {
    title: '上海',
    value: 3,
    handleClick: function (item, isActive) {
      viewmodel.tagClick(item, isActive)
    }
  }, {
    title: '上海',
    value: 3,
    handleClick: function (item, isActive) {
      viewmodel.tagClick(item, isActive)
    }
  }, {
    title: '上海',
    value: 3,
    handleClick: function (item, isActive) {
      viewmodel.tagClick(item, isActive)
    }
  }]),
  rows: ko.observableArray([
    {id: ko.observable(1), name: ko.observable('张三')},
    {id: ko.observable(2), name: ko.observable('张李四')},
    {id: ko.observable(3), name: ko.observable('张李')}
  ]),
  pureRows: ko.observableArray([{
    id: 1, name: 2
  }]),
  rowspancol: ko.observableArray([
    {
      title: '<div title="第一列">第一列</div>',
      width: '100',
      field: 'field1',
      type: 'render',
      renderFn: function (row) {
        let template = `<div>${row.field1}</div>
          <span>第一列是由多列组成</span>
        `
        return template
      }
    }, {
      title: '第二列',
      width: '100',
      field: 'field2'
    }, {
      title: '第三列',
      width: '100',
      field: 'field3'
    }, {
      title: '第四列折行的列名',
      width: '100',
      field: 'field4',
      align: 'right'
    }, {
      title: '第五列',
      width: '50%',
      field: 'field5'
    }, {
      title: '第六列',
      width: '50%',
      field: 'field6'
    }
  ]),
  rowspanrows: ko.observableArray(),
  pureColumns: ko.observableArray([
    {
      title: '',
      field: '',
      type: 'checkbox',
      hidden: false,
      width: 50
    },
    {
      title: '序号',
      width: 70,
      type: 'index'
    },
    {
      title: 'name',
      field: 'name',
      hidden: false,
      align: 'right',
      width: '20%'
    },
    {
      field: 'id',
      title: 'renderFn',
      type: 'render',
      hidden: false,
      renderFn: function (row, index) {
        return `<div onclick="clickme(event)" data-id='${row.id}'>${index + row.name + row.id + '通过render函数生成的html片段'}</div>`
      }
    }, {
      field: 'id',
      title: 'operation',
      hidden: false,
      type: 'render',
      renderFn: function (row, index) {
        window.clickme = function (event) {
          console.log(row.id)
        }
        var links = `<a class="y-grid-operation" href="http://www.baidu.com?id=${row.id}">新增</a>
          <a class="y-grid-operation"  href="http://www.baidu.com?id=${row.id}">修改</a>
          <span class="y-grid-operation" onclick="clickme(event)">删除</span>
        `
        return links
      }
    }
  ]),
  datatable: dt.rows,
  pageIndex: ko.observable(0),
  totalCount: ko.observable(112),
  pageSize: ko.observable(10),
  onSelectChange: function (data) {
    console.log('change:' + JSON.stringify(data))
  },
  onPageChage: function (pageIndex, pageSize) {
    console.log('pageIndex:' + pageIndex + ' ,pageSize:' + pageSize)
  },
  datepicker: ko.observable(),
  onInputBlur: function (data) {
    alert('blur')
  },
  asyncTreeData: ko.observableArray([]),
  selectList: ko.observableArray([]),
  checkboxValue: ko.observableArray([]),
  checkboxDataList: ko.observableArray([{value: 1,label:'北京'},{value: 2,label:'上海'}]),
  radioValue: ko.observable(),
  radioDataList: ko.observableArray([{value: 1,label:'无发票'},{value: 2,label:'普通发票'},{value: 3,label:'增值锐发票'}]),
  stateTabsItems:ko.observableArray([
    {
      title: '待收货',
      state: 1
    },
    {
      title: '已收货',
      state: 2,
      num: 2
    },
    {
      title: '待收货',
      state: 3,
      num: 3
    }
  ]),
  stateTabsHandler (data) {
    debugger
    console.log(data)
  },
  curStateIndex: ko.observable(0),
  scrollColumn: [
    {
      title: '宽度600',
      width: 600,
      field: 'a'
    },
    {
      title: '宽度400',
      width: 400,
      field: 'a'
    },
    {
      title: '宽度300',
      width: 500,
      field: 'b'
    },
    {
      title: '宽度300',
      width: 500,
      field: 'b'
    },
    {
      title: '宽度300',
      width: 500
    }
  ],
  scrollRows: ko.observableArray([
    {a: 1, b: 2},
    {a: 1, b: 2},
    {a: 1, b: 2}
  ])
}
setTimeout(() => {
  viewmodel.loading(!viewmodel.loading())
  var item = viewmodel.stateTabsItems()[0]
  item.num = 0
  viewmodel.stateTabsItems.splice(0, 1)
  viewmodel.stateTabsItems.splice(0, 0, item)
  viewmodel.rowspanrows([
    {
      field1: 'A',
      field2: 'A',
      field3: 'C',
      field4: 'D',
      field5: 'E',
      field6: 'F'
    }, {
      field1: 'A',
      field2: 'A',
      field3: 'C',
      field4: 'D',
      field5: 'E',
      field6: 'F1'
    }, {
      field1: 'A',
      field2: 'C',
      field3: 'D',
      field4: 'D',
      field5: 'E',
      field6: 'F2'
    }, {
      field1: 'A',
      field2: 'C',
      field3: 'E',
      field4: 'D',
      field5: 'E',
      field6: 'F'
    }, {
      field1: 'B',
      field2: 'B',
      field3: 'C',
      field4: 'D',
      field5: 'E',
      field6: 'F'
    }, {
      field1: 'B',
      field2: 'B',
      field3: 'C',
      field4: 'D',
      field5: 'E',
      field6: 'F'
    }, {
      field1: 'B',
      field2: 'B',
      field3: 'C',
      field4: 'D',
      field5: 'E',
      field6: 'F'
    }
  ])
}, 1000)
// 打印每次单选的内容
viewmodel.singleselect.subscribe(function (item) {
  console.log('单选：')
  console.log(item)
})
viewmodel.multiselect.subscribe(function (items) {
  console.log('多选：')
  console.log(items)
})
window.vm = viewmodel
window.clickme = function clickme (event) {
  console.log(event)
}
ko.applyBindings(viewmodel, document.getElementById('app'))
setTimeout(() => {
  viewmodel.asyncTreeData([{id: 1, name: '北京总公司'}])
  viewmodel.selectList([
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
  viewmodel.multiselect([{value:1}, {value:2}])
  viewmodel.singleselect({value:1,label:'北京'})
}, 500)
setTimeout(() => {
  ycloud.notice.info('info', {timeout: 2000})
}, 1000)
setTimeout(() => {
  ycloud.notice.error('here has some error！here has some error！here has some error！here has some error！here has some error！here has some error！')
}, 3000)
