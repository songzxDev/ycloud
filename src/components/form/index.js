import template from './index.html'
import {refmixin} from '@/mixin'
import ko from 'knockout'
import Schema from 'async-validator'
function init (params) {
  refmixin.call(this, params)
  if (params.vRules) {
    this.formValidate = (data, handleCallback) => {
      var validator = new Schema(params.vRules)
      validator.validate(data, (errors, fields) => {
        if (errors) {
          this.validateList([])
          errors.forEach(error => {
            this.validateList.push({key: error.field})
          })
          return handleCallback(errors, fields)
        }
        // validation passed
      })
    }
  }
  this.validateList = ko.observableArray()
  this.model = params.model
  this.labelWidth = params.labelWidth || '80px'
  this.textAlignCls = (params.labelAlign || 'right') === 'right' ? 'y-form-text-right' : 'y-form-text-left'
}

export default {
  name: 'form',
  init,
  template
}
