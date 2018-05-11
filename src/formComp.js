import ko from 'knockout'
var template = `
  <div data-bind="let:{model2: row}">
    <y-form params="labelWidth:'120px',labelAlign:'right'">
      <div class="col-md-3">
      <y-formitem params="label:'id:'">
        <y-input params="value: model2.id"></y-input>
      </y-formitem>
      </div>
      <div class="col-md-3">
      <y-formitem params="label:'名称:'">
        <y-input params="value: model2.name"></y-input>
      </y-formitem>
      </div>
      <div class="col-md-offset-6"></div>
      <div class="col-md-3">
      <y-formitem params="label:'可选择标签:'">
        <y-searchtag params="enableActive:true,tagList: $root.tagList"></y-searchtag>
      </y-formitem>
      </div>
      <div class="col-md-offset-6"></div>
    </y-form>
    <div class="col-md-12">
      <y-button params="click:handleSave">保存</y-button>
    </div>
  </div>
`
var init = function (params) {
  this.row = params.value
  this.handleSave = function () {
    this.row._expand(!this.row._expand())
  }.bind(this)
}
ko.components.register('demo-form', {
  viewModel: init,
  template: template
})
