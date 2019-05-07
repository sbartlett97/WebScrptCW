'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const updateHeaders = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  headers: {
          "Content-Type": "application/json",
      }
}
//function to display popup
function div_show(form) {
  document.getElementById(form).style.display = "block";
}
//function to hide popup
function div_hide(form){
  document.getElementById(form).style.display = "none";
}

function checkInputs(action, type){
  let regEx = /(.+)[^\s{2,}]/
  if(type == "text"){
    let color = (document.getElementById('tTextColor') ? document.getElementById('tTextColor').value : 'black');
    let background = (document.getElementById('tBackground') ? document.getElementById('tBackground').value : 'white');
    if(regEx.test(document.getElementById('tName').value) && regEx.test(document.getElementById('tMsg').value)){
      if(action == 'preview'){
        let text = document.getElementById('tMsg').value;
        const preview = document.getElementById('templateViewer');
        preview.style = `text-align: center; color:${color}; background-color: ${background}; padding-top: 200px;`;
        preview.innerHTML = `<h1>${text}</h1>`;
        div_hide(type);
      }else{
        console.log('sending to server');
        sendToServer('t');
        div_hide(type);
      }
    }else{
      window.alert('Please enter a valid name and text');
    }
  }else if(type=="quote"){
    let color = (document.getElementById('qTextColor') ? document.getElementById('qTextColor').value : 'black');
    let background = (document.getElementById('qBackground') ? document.getElementById('qBackground').value : 'white');
    if(regEx.test(document.getElementById('qName').value) && regEx.test(document.getElementById('qMsg').value)){
      if(document.getElementById('qMsg').value.includes('-')){
        if(action == 'preview'){
            let text = document.getElementById('qMsg').value.split('-');
            const preview = document.getElementById('templateViewer');
            preview.style = `padding-top: 200px; text-align: center; color:${color}; background-color: ${background}`;
            preview.innerHTML = `<h1>${text[0]}</h1><h2 style="background-color: none; font-style: italic;">-${text[1]}</h2>`;
            div_hide(type);
          }else{
            sendToServer('q');
            div_hide(type);
        }
      }else{
        window.alert('please enter valid text into the quote field, with the author seperated by a hyphon (-)');
      }
    }else{
      window.alert('Please enter a valid name and text');
    }
  }
}
async function sendToServer(prefix){
  if (prefix == "t" || prefix == "q"){
    const page = {};
    page.title = `${removeSpaces(document.getElementById(`${prefix}Name`).value)}`;
    page.data = {}
    page.data.background = (document.getElementById(`${prefix}Background`).value ? document.getElementById(`${prefix}Background`).value : 'white');
    page.data.font = (document.getElementById(`${prefix}TextColor`).value ? document.getElementById(`${prefix}TextColor`).value : 'black');
    if (prefix == 't'){
      page.data.text = `${document.getElementById(`${prefix}Msg`).value}`;
      page.data.type = 'text';
    }else{
      let text = document.getElementById('qMsg').value.split('-');
      page.data.text = `${text[0]}`;
      page.data.author = `${text[1]}`
      page.data.type = 'quote';
    }
    updateHeaders.body = JSON.stringify(page);
    let res = await fetch('/updateJSON', updateHeaders);
  }
  localStorage.update = true;
  window.location = 'index.html';

}

function removeSpaces(text){

  let textArray = text.split(' ');
  text = '';
  textArray.forEach(function(item, index){
    if(index > 0){
      let newItem = item.charAt(0).toUpperCase()+ item.slice(1);
      text = text + newItem;
    }else{
      text = item
    }
  });
  return text;
}
