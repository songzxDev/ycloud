import template from './index.html'
import Base from '@/core/base'
import ko from 'knockout'
import Schema from 'async-validator'
class Form extends Base {
  initialize (params) {
    this.validateList = ko.observableArray()
    this.model = params.model
    this.labelWidth = params.labelWidth || '80px'
    this.textAlignCls = (params.labelAlign || 'right') === 'right' ? 'y-form-text-right' : 'y-form-text-left'
    this.vRules = params.vRules
  }
  formValidate (data, handleCallback) {
    var validator = new Schema(this.vRules)
    validator.validate(data, (errors, fields) => {
      if (errors) {
        this.validateList([])
        errors.forEach(error => {
          this.validateList.push({key: error.field})
        })
        return handleCallback(errors, fields)
      }
    })
  }
}

export default {
  name: 'form',
  init: Base.createViewModel(Form),
  template
}
