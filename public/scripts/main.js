'use strict'

async function requestUpdateStatus(){
  let request = new XMLHttpRequest();
  request.onreadystatechanged = function(){
    console.log(request.readyState);
    console.log(request.status);
    if (request.readyState == 4 && request.status == 200){
      updatePage();
    }
  }
  request.open('GET', 'http://localhost:8080/updateState', true)
  request.send();
}

function updatePage(){
  let request = new XMLHttpRequest();
  request.open('GET', 'localhost:8080', true)
  request.send();
}

setInterval(requestUpdateStatus, 5000);
