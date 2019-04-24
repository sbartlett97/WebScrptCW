'use strict'
const updateHeaders = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  headers: {
          "Content-Type": "application/json",
      }
  }

function initialise(){
  refreshTemplates();
  document.querySelector('button.refresh').addEventListener('click', refreshTemplates);
}


async function sendToServer(event){
  const targetPage = event.target.id;
  const data = {target: targetPage};
  updateHeaders.body = JSON.stringify(data);
  const response = await fetch('/update', updateHeaders);
  return true;
}


function loadPageBuilder(){
  window.location = './builder.html';
}


async function refreshTemplates(){

  const article = document.querySelector('article');
  article.innerHTML = '';
  const response = await fetch('/refreshTemplates');
  let pages = await response.text();

  pages = JSON.parse(pages);
  const pagesList = pages.rows;
  pagesList.forEach(async function(item){
    const section = createSection(article);
    const iframe = document.createElement('iframe');
    iframe.srcdoc = await renderIframe(item);
    const radio = createRadio(item[1]);
    section.appendChild(iframe);
    section.appendChild(radio);
  });
  addCreateButton();
}

function addCreateButton(){
  const article = document.querySelector('article');
  const section = createSection(article);
  const button = document.createElement('button');
  section.appendChild(button);
  const img = document.createElement('img');
  img.src = './styles/images/add_button.png';
  button.appendChild(img);
  img.addEventListener('click', loadPageBuilder);
}

async function renderIframe(item){
  let res;
  switch (item[2]) {
    case "text":
      res = await fetch(`/iframe/text/${item[0]}`);
      break;
    case "quote":
      res = await fetch(`/iframe/quote/${item[0]}`);
      break;
    case "picture":
      res = await fetch(`/iframe/pic/${item[0]}`);
      break;
    default:
      break;
  }
  let text = await res.text();
  return text;

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


function createSection(article){
  const section = document.createElement('section');
  section.classList.add('iframeContainer');
  article.appendChild(section);
  return section;
}

document.addEventListener('DOMContentLoaded', initialise);
