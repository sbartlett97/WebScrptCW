'use strict'

async function requestUpdateStatus(){
  let request = new XMLHttpRequest();
  request.responseType = 'text';
  request.open('GET', 'http://192.168.0.84:8080/updateState', true)
  request.send();
}

function updatePage(){
  location.reload(true);
}

setInterval(requestUpdateStatus, 60000);
