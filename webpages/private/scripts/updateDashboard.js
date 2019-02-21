'use strict'
async function sendToServer(event){
  const targetPage = event.target.id;
  console.log(targetPage);
  const data = {target: targetPage};
  const response = await fetch('/update', {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
  });
  return true;
}

function initialise(){
  const rads = document.querySelectorAll('input.radio');
  rads.forEach(function(item){
    item.addEventListener('click', sendToServer);
  })
}

document.addEventListener('DOMContentLoaded', initialise);
