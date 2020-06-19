document.addEventListener('DOMContentLoaded', function() {
    let iframe = document.querySelector('iframe')
    let button = document.querySelector('button')
  
    button.addEventListener('click', function() {
      if(iframe.requestFullscreen) {
        iframe.requestFullscreen()
      }
      else if(iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen()
      }
      else if(iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen()
      }
      else if(iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen()
      }
    })
  })
  