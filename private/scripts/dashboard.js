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


//runs whenever we load the page
function initialise(){

  //if we localStorage.update has been set to true or doesn't exist get the json from server
  if(localStorage.update == 'true' || !localStorage.update){
      getjson();
      localStorage.update = 'false';

  //otherwise just load the templates form local storage
  }else{
    loadPreviews();
  }
}

//function for sending the next page to the server
async function sendToServer(event){

  //pull the page id from the radio button
  const targetPage = event.target.id;

  //set it as target
  const data = {target: targetPage};

  //add the data to our request headers
  updateHeaders.body = JSON.stringify(data);

  //try to post to server
  try{
    const response = await fetch('/update', updateHeaders);
  }catch(e){
    //alert user if there is an error
    window.alert('An error occured, please try again later.' + e);
  }
}


//funciton for retrieving json data from server
async function getjson(){
  try{
    //try to get data
    const res = await fetch('/getJSON');
    const json = await res.json();

    //if we get it store it in local storage and load the previews
    localStorage.pages = JSON.stringify(json);
    loadPreviews();

  }catch(e){
    //if we get an error let user know
    window.alert('An error occured, please try again later. ' + e);
  }
}


//function for loading the page previews into the DOM
function loadPreviews(){

  //pull the page data out of local storage
  const pageData = JSON.parse(localStorage.pages);

  //get the article object and clear its content
  const article = document.querySelector('article');
  article.innerHTML = '';

  //loop through the JSON array
  pageData.forEach(function(item){

    //create the section for the next preview and add delete button
    const section = createSection(article, item.title);
    addDeleteButton(section, item.title);

    //create the div and radio selector
    const div = document.createElement('div');
    let radio = document.createElement('input');

    //setup the data depending on the previews type
    div.classList.add('preview');
    if (item.data.type == "text" || item.data.type == "quote"){
      div.classList.add(item.data.type);
      div.style = `background: ${item.data.background}; color: ${item.data.font};`;
      div.innerHTML = (item.data.type == "text"? `<h1>${item.data.text}</h1>`: `<h1>${item.data.text}</h1><h2>-${item.data.author}</h2>`);

    }else{
      //only other case is an image
      div.style = `background-image: url("/${item.data.url}");`;
    }

    //edit the radio button values
    radio = setupRadio(radio, item.title);

    //append the elements to the DOM
    section.appendChild(div);
    section.appendChild(radio);
  });

  //create the 'add' button after all of the previews
  addCreateButton(article);
}

//loads the page builder
function loadPageBilder(){
  window.location = './builder.html';
}

//function for creating the 'add' button
function addCreateButton(article){
  //create the containg section
  const section = createSection(article);

  //create the button, add its class for styling
  const button = document.createElement('button');
  section.classList.add('addButton');

  //append it to the DOM
  section.appendChild(button);

  //create the image, append it, and set its event listener
  const img = document.createElement('img');
  img.src = './styles/images/add_button.png';
  button.appendChild(img);
  button.addEventListener('click', loadPageBilder);
}

//function for radio button configuration
function setupRadio(radio, value){

  //set its values
  radio.type = 'radio';
  radio.id = `${value}`;
  radio.name = 'template';
  radio.classList.add('radio');

  //add its event listener
  radio.addEventListener('click', sendToServer);
  return radio;
}

//function for creating the delete buttons
function addDeleteButton(section, page){

  //setup the image element
  const img = document.createElement('img');

  //add its class for styling
  img.classList.add('delete');

  //set the id so we know which page it points to in the JSON
  img.id = page

  //set the image
  img.src = './styles/images/delete.png';

  //add its event listener and append it to the section
  img.addEventListener('click', deletePage);
  section.appendChild(img);
}

//function for creating the containing sections
function createSection(article){
  //create the section
  const section = document.createElement('section');

  //add its class for styling
  section.classList.add('iframeContainer');

  // append it to the article
  article.appendChild(section);

  // return the finished section
  return section;
}

//Function for deleting a page from the JSON
async function deletePage(event){

  //setup the request headers
  const headers = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
            "Content-Type": "application/json",
        }
  }
  //set the target page that we want to delete
  const data = {target: `${event.target.id}`};
  headers.body = JSON.stringify(data);

  try {
      //make our request to the server
      const response = await fetch('/deletePage', headers);

      //check for an error
      if (!response.ok)
          throw new Error(response.statusText);

      //if we don't get an error, alert the user and reload the previews
      window.alert('Page Deleted');
      getjson();
  } catch (err) {

      //if we couldn't fetch log the error and let the user know
      console.log(err);
      window.alert('An error occurd, please try again.');
  }
}

//set initialise to run when the DOM is finished loading in
document.addEventListener('DOMContentLoaded', initialise);
