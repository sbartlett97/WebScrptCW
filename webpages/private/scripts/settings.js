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
  console.log(pagesList);
  pagesList.forEach(async function(item){
    console.log(item);
    const section = createSection();
    const iframe = document.createElement('iframe');
    iframe.srcdoc = await renderIframe(item);
    const radio = createRadio(item[1]);
    section.appendChild(iframe);
    section.appendChild(radio);
  });
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
    case "calendar":
      res = await fetch(`/iframe/calendar/${item[0]}`);
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


function createSection(){
  const article = document.querySelector('article');
  const section = document.createElement('section');
  section.classList.add('iframeContainer');
  article.appendChild(section);
  return section;
}

document.addEventListener('DOMContentLoaded', initialise);
