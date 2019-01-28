'use strict'

async function requestUpdateStatus(){
  let request = new XMLHttpRequest();
  request.onreadystatechanged = function(){
    console.log(request.readyState);
    console.log(request.status);
    if (request.readyState == 4 && request.status == 200){
      console.log(request.responseText);
    }
  }
  request.open('GET', 'http://localhost:8080/updateState', true)
  request.send();
}

function updatePage(){
  location.reload(true);
}

setInterval(requestUpdateStatus, 5000);
