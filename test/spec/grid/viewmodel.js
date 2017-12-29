import ko from 'knockout'
window.PREFIX = 'y-'
var viewmodel = {
  rows: ko.observableArray(),
  columns: [
    {
      title: '序号',
      type: 'index'
    }, {
      title: '',
      type: 'checkbox'
    }, {
      title: '姓名',
      field: 'name'
    }
  ]
}
export default viewmodel
