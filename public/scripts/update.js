'use strict'
let ip = '';

async function requestUpdateStatus(){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.status == 200 && request.readyState == 4){
       if (request.responseText === 'true'){
         document.location.reload(true);
       }else{
         console.log('no update');
       }
    }
  };
  request.open('GET', 'http://'+ ip +':8080/updateState', true)
  request.send();
}

async function loadIP(){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.status == 200 && request.readyState == 4){
      ip = request.responseText;
    }
  };
  request.responseType = 'text';
  request.open('GET', 'ip.text', true);
  request.send();
}
loadIP();
setInterval(requestUpdateStatus, 10000);
