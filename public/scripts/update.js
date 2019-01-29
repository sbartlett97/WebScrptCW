'use strict'

async function requestUpdateStatus(){
  const response = await fetch('/updateState');
  const updateText = await response.text();
  console.log(updateText);
  if(updateText == 'true'){
    window.location.reload();
  }
}

setInterval(requestUpdateStatus, 60000);
