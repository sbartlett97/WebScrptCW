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
  getjson();
  document.querySelector('button.refresh').addEventListener('click', getjson);
}


async function sendToServer(event){
  const targetPage = event.target.id;
  const data = {target: targetPage};
  updateHeaders.body = JSON.stringify(data);
  const response = await fetch('/update', updateHeaders);
  return true;
}

async function getjson(){
  const res = await fetch('/getJSON');
  const json = await res.json();
  localStorage.pages = JSON.stringify(json);
  loadPreviews();
}

function loadPreviews(){
  const pageData = JSON.parse(localStorage.pages);
  const article = document.querySelector('article');
  article.innerHTML = '';
  pageData.forEach(function(item){
    const section = createSection(article);
    const div = document.createElement('div');
    let radio = document.createElement('input');
    div.classList.add('preview');
    if (item.data.type == "text" || item.data.type == "quote"){
      div.classList.add(item.data.type);
      div.style = `background: ${item.data.background}; color: ${item.data.font};`;
      div.innerHTML = (item.data.type == "text"? `<h1>${item.data.text}</h1>`: `<h1>${item.data.text}</h1><h2>-${item.data.author}</h2>`);

    }else{
      div.style = `background-image: url("/${item.data.url}");`;
    }
    radio = setupRadio(radio, item.title);
    section.appendChild(div);
    section.appendChild(radio);
  });
  addCreateButton(article);
}

function loadPageBilder(){
  console.log('Add button clicked');
  window.location = './builder.html';
}

function addCreateButton(article){
  const section = createSection(article);
  const button = document.createElement('button');
  section.appendChild(button);
  const img = document.createElement('img');
  img.src = './styles/images/add_button.png';
  button.appendChild(img);
  button.addEventListener('click', loadPageBilder);
}


function setupRadio(radio, value){
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
