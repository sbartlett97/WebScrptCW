'use strict'


const headers = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  headers: {
          "Content-Type": "application/json",
      }
  }


async function sendToServer(event){
  const targetPage = event.target.id;
  const data = {target: targetPage};
  headers.body = JSON.stringify(data);
  const response = await fetch('/update', headers);
  return true;
}


function initialise(){
  refreshTemplates();
  document.querySelector('button.refresh').addEventListener('click', refreshTemplates);
}


function loadPageBuilder(){
  window.location = './builder.html';
}


async function refreshTemplates(){
  const article = document.querySelector('article');
  article.innerHTML = '';
  const response = await fetch('/refreshTemplates');
  const resText = await response.text();
  JSON.parse(resText, (key, value) => {
    console.log(key);
    const section = createSection();
    if(key != ""){
      const iframe = document.createElement('iframe');
      iframe.src = `/${value}/config`
      const radio = createRadio(value);
      section.appendChild(iframe);
      section.appendChild(radio);
    }else{
      const button = document.createElement('button');
      section.appendChild(button);
      const img = document.createElement('img');
      img.src = './styles/images/add_button.png';
      button.appendChild(img);
      img.addEventListener('click', loadPageBuilder);
    }
  });
}


function createRadio(value){
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.id = `${value}`;
  radio.name = 'template';
  radio.classList.add('radio');
  radio.addEventListener('click', sendToServer);
  return radio;
}


function createSection(){
  const article = document.querySelector('article');
  const section = document.createElement('section');
  section.classList.add('iframeContainer');
  article.appendChild(section);
  return section;
}

document.addEventListener('DOMContentLoaded', initialise);
