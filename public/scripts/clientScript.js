/*
UP777815 Web Script Programming Coursework 2019
*/

//runs when page initialy loads, used to display a default page
localStorage.firstTimeSetup = true;

//get initial JSON from server and set interval at which to check for updates
getjson();
setInterval(checkUpdate, 15000);


/**
 * getjson - gets the page JSON from the server
 *
 */
async function getjson(){
  //fetch JSON
  const res = await fetch('/getJSON');
  const json = await res.json();

  //loop through the known JSON array and add each element to local storage
  json.forEach(function(item){
    localStorage.setItem(item.title, JSON.stringify(item.data));
  });

  //check if this is the first time running getjson() and display a deafult page if it is
  if(localStorage.firstTimeSetup){
      localStorage.firstTimeSetup = false;
      loadPage('technicalDifficulties');
  }
}



/**
 * checkUpdate - checks if we need to dispaly a different page
 *
 */
async function checkUpdate(){

  //pull the title content to be used for checking page we should display
  const title = document.querySelector('title').innerHTML;

  //try to contact the server
  try {
      const response = await fetch('/update')
      if (!response.ok)
          throw new Error(response.statusText);

      //if we don't get an error, get the response from the server
      let checkPage = await response.text();

      //if we need to display a different page, pass it to loadPages()
      if (checkPage != title) loadPage(checkPage);
  } catch (err) {

      //if we couldn't fetch log the error and display the technical difficulties page
      console.log(err);
      loadPage('technicalDifficulties');
  }
}



/**
 * loadPage - loads a page from the data stored in localStorage
 *
 * @param  {String} page the page to be loaded
 */ 
function loadPage(page){
  //check if our page data is already in local storage
  if(localStorage.getItem(page) != null){

    //get the page data as a JSON object
    let loadingPage = JSON.parse(localStorage.getItem(page));

    //select the body element for editing
    const body = document.querySelector('body');

    //determine the type of page we are displaying
    if(loadingPage.type == "text" || loadingPage.type == "quote"){

      //set custom styling
      body.style = `background-color: ${loadingPage.background};color: ${loadingPage.font}`;

      //ternary to check if we are displaying text or a quote
      body.innerHTML = (loadingPage.type == "text" ? `<h1>${loadingPage.text}</h1>` : `<h1>${loadingPage.text}</h1><h2>-${loadingPage.author}</h2>`);
    }else{
      console.log('loading image');
      //only other case is an image
      body.innerHTML = `<img src=${loadingPage.url}></img>`;
    }

    //set the new page title so we can check fir future updates
    document.querySelector('title').innerHTML = page;
  }else{
    if(page == 'calendar'){
      document.body.style = "background: none";
      console.log('trying calendar');
      document.querySelector('title').innerHTML = page;
      document.body.innerHTML = '<div id="calendar" class="calendar"></div>';
      populateCalendar();
    }else{
      //if our page is not in local storage, fetch the new JSON from server and call loadPage again
      getjson();
      loadPage(page);
    }
  }
}
