import $ from 'jquery'
let $notice = {
  init: function (msg, type) {
    let infoTemplate = `
      <div id="y-notice" class="y-notice">
        <div class="y-notice-ctn">
          <i class="fa fa-info-circle"></i>${msg}
          <span onclick="closenotice()">+</span>
        </div>
        
      </div>`
    let errorTemplate = `
      <div id="y-notice" class="y-notice">
        <div class="y-notice-ctn y-notice-error">
          <i class="fa fa-warning"></i>${msg}
          <span onclick="closenotice()">+</span>
        </div>
      </div>`
    $('#y-notice').remove()
    if (type === 'info') {
      $('body').append(infoTemplate)
    } else if (type === 'error') {
      $('body').append(errorTemplate)
    }
    setTimeout(() => {
      $('#y-notice').addClass('y-notice-active')
    }, 100)
  },
  info: function (msg, option = {}) {
    this.init(msg, 'info')
    setTimeout(() => {
      this.close()
    }, option.timeout || 4000)
  },
  error: function (msg, option = {}) {
    this.init(msg, 'error')
    setTimeout(() => {
      this.close()
    }, option.timeout || 8000)
  },
  close: function () {
    $('#y-notice').removeClass('y-notice-active')
    $('#y-notice').addClass('y-notice-hide')
  }
}
window.closenotice = $notice.close
export let notice = $notice
