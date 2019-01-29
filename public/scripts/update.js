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
  request.open('GET', '/updateState', true)
  request.send();
}
requestUpdateStatus();
setInterval(requestUpdateStatus, 10000);
