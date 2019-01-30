'use strict'
async function sendToServer(){
  let rads = document.querySelectorAll('input.radio');
  let targetPage;
  rads.forEach(function(item){
    if(item.checked){
      targetPage = item.id;
    }
  });
  console.log(targetPage);
  let data = {target: targetPage};
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
