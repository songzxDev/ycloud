function validatemixin (params) {
  this.validate = params.validate || function () {}
  if (params.validate) {
    this.validate(false)
  } else {
    this.validate(true)
  }
  this.judgeValidate = (val) => {
    // 如果不传入validate那么就默认认为检验通过
    if (params.validate) {
      if (val) {
        this.validate(true)
      } else {
        this.validate(false)
      }
    } else {
      this.validate(true)
    }
  }
}
function refmixin (params) {
  if (params.ref) {
    if (window.YCLOUD_REFS) {
      let refs = window.YCLOUD_REFS
      refs[params.ref] = this
    } else {
      window.YCLOUD_REFS = {}
      window.YCLOUD_REFS[params.ref] = this
    }
  }
}
export {
  refmixin,
  validatemixin
}
