'use strict'

async function requestUpdateStatus(){
  const response = await fetch('/updateState');
  const updateText = await response.text();
  console.log(updateText);
  if(updateText == 'true'){
    location.reload();
  }
}

setInterval(requestUpdateStatus, 5000);

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

/*
  Not working but usefull to know - could be used to
  simulate text typing on the screen.
*/
function simulateKeypress(){
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
}
