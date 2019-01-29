'use strict'

async function requestUpdateStatus(){
  const response = await fetch('/updateState');
  const updateText = await response.text();
  console.log(updateText);
  if(updateText == 'true'){
    const respone = await fetch('/');
  }
}

setInterval(requestUpdateStatus, 60000);

document.addEventListener('keypress', function(e){
  if (e.keyCode === 13) {
    goFullScreen();
  }
}, false);

function goFullScreen() {
  if (!document.fullscreenElement) {
    let fsResult = document.documentElement.requestFullscreen();
  }
}
let keyPress = new KeyboardEvent('keypress', {
  key: 'Enter',
  code: 'Enter',
  location: 2,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  metaKey: false,
  repeat: false,
  isComposing: false,
  keyCode: 13
})
document.dispatchEvent(keyPress);
