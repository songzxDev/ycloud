import $ from 'jquery'
let $loading = {
  show: function (msg = ' 加载中...') {
    let infoTemplate = `
      <div id="y-loading" class="y-loading">
        <div class="y-loading-ctn">
          <div class="y-loading-spin">
            <svg class="spinner" width="10px" height="10px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>
          ${msg}
        </div>
      </div>`
    $('#y-loading').remove()
    $('body').append(infoTemplate)
    setTimeout(() => {
      $('#y-loading').addClass('y-loading-active')
    }, 100)
  },
  hide: function () {
    $('#y-loading').remove()
  }
}
window.hideloading = $loading.hide
export let loading = $loading
