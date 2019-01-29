'use strict'
let ip = '';
function sendToServer(){
  let target = '/update';
  let request = new XMLHttpRequest();
  console.log(target);
  request.open('POST', target, true);
  request.send();
}

document.getElementById('submit').addEventListener('click', sendToServer, false);
