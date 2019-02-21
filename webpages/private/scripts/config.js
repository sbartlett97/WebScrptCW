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
  refreshTemplates();

}

async function refreshTemplates(){
  const response = await fetch('/refreshTemplates');
  const resText = await response.text();
  const article = document.querySelector('article');
  JSON.parse(resText, (key, value) => {
    console.log(key);
    if(key != ""){
      const section = document.createElement('section');
      section.classList.add('iframeContainer');
      article.appendChild(section);
      const iframe = document.createElement('iframe');
      iframe.src = `/${value}/config`
      const selector = document.createElement('input');
      selector.type = 'radio';
      selector.id = `${value}`;
      selector.name = 'template';
      selector.classList.add('radio');
      selector.addEventListener('click', sendToServer);
      section.appendChild(iframe);
      section.appendChild(selector);
    }
  });
}
document.addEventListener('DOMContentLoaded', initialise);
document.querySelector('.button').addEventListener('click', refreshTemplates);
