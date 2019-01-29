'use strict'
async function sendToServer(){
  const response = await fetch('/update');
}

document.getElementById('submit').addEventListener('click', sendToServer, false);
