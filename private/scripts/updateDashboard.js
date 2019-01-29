'use strict'
let ip = '';
function sendToServer(){
  let target = `http://${ip}:8080/update`;
  let request = new XMLHttpRequest();
  console.log(target);
  request.open('POST', target, true);
  request.send();
}
function loadIP(){
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


document.getElementById('submit').addEventListener('click', sendToServer, false);
loadIP();
