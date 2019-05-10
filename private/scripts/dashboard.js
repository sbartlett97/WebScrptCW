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


/**
 * initialise - performs necessary actions when DOM loads
 */
function initialise() {

	//if we localStorage.update has been set to true or doesn't exist get the json from server
	if (localStorage.update == 'true' || !localStorage.update) {
		getjson();
		localStorage.update = 'false';

		//otherwise just load the templates form local storage
	} else {
		loadPreviews();
	}
}


/**
 * sendToServer - sends the next page to be displayed to the server
 *
 * @param  {DOM Event} event event that trigered the function call
 */
async function sendToServer(event) {

	//pull the page id from the radio button
	const targetPage = event.target.id;

	//set it as target
	const data = {
		target: targetPage
	};

	//add the data to our request headers
	updateHeaders.body = JSON.stringify(data);

	//try to post to server
	try {
		const response = await fetch('/update', updateHeaders);
	} catch (e) {
		//alert user if there is an error
		window.alert('An error occured, please try again later.' + e);
	}
}


/**
 * getjson - Retrieves the page list json from the server and stores it in local storage
 *
 */

async function getjson() {
	try {
		//try to get data
		console.log('getting JSON');
		const res = await fetch('/getJSON');
		const json = await res.json();

		//if we get it store it in local storage and load the previews
		localStorage.pages = JSON.stringify(json);
		loadPreviews();

	} catch (e) {
		//if we get an error let user know
		window.alert('An error occured, please try again later. ' + e);
	}
}


/**
 * loadPreviews - Loads all the previews form the page data stored in local storage
 */
function loadPreviews() {

	//pull the page data out of local storage
	const pageData = JSON.parse(localStorage.pages);

	//get the article object and clear its content
	const article = document.querySelector('article');
	article.innerHTML = '';

	//loop through the JSON array
	pageData.forEach(function (item) {
		if(item.title != 'technicalDifficulties'){
			//create the section for the next preview and add delete button
			const section = createSection(article);
			addDeleteButton(section, item.title);


			//create the div and radio selector
			const div = document.createElement('div');
			let radio = document.createElement('input');

			//setup the data depending on the previews type
			div.classList.add('preview');
			if (item.data.type == "text" || item.data.type == "quote") {
				div.classList.add(item.data.type);
				div.style = `background: ${item.data.background}; color: ${item.data.font};`;
				div.innerHTML = (item.data.type == "text" ? `<h1>${item.data.text}</h1>` : `<h1>${item.data.text}</h1><h2>-${item.data.author}</h2>`);

			} else {

				//only other case is an image
				div.style = `background-image: url("/${item.data.url}");`;
			}

			//edit the radio button values
			radio = setupRadio(radio, item.title);

			//append the elements to the DOM
			section.appendChild(div);
			section.appendChild(radio);
		}
	});

	//create the 'add' button after all of the previews
	addCreateButton(article);
}


/**
 * loadPageBilder - Navigates user to the page builder
 */
function loadPageBilder() {
	window.location = 'builder.html';
}


/**
 * addCreateButton - creates the button that links to the builder page and adds it to the existing previews
 *
 * @param  {DOMElement} article the article to append the new section to
 */
function addCreateButton(article) {
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

/**
 * setupRadio - sets up the radio button for each preview so it can be displayed on the remote display
 *
 * @param  {DOM Element} radio the input element to be turned into a radio button
 * @param  {String} page the id for the page it refers to
 * @return {DOM Element}       returns the new radio button
 */
function setupRadio(radio, page) {

	//set its values
	radio.type = 'radio';
	radio.id = `${page}`;
	radio.name = 'template';
	radio.classList.add('radio');

	//add its event listener
	radio.addEventListener('click', sendToServer);
	return radio;
}


/**
 * addDeleteButton - adds the delete button to a section so its page can be deleted from the server
 *
 * @param  {DOM Element} section the section to append the delete button to
 * @param  {String} page    the page id the button refers to
 * @return {type}         returns nothing
 */
function addDeleteButton(section, page) {

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

/**
 * createSection - creates a section for a preview to be loaded into
 *
 * @param  {DOM Element} article the parent article
 * @return {DOM Element}         returns the newly created section
 */
function createSection(article) {
	//create the section
	const section = document.createElement('section');

	//add its class for styling
	section.classList.add('iframeContainer');

	// append it to the article
	article.appendChild(section);

	// return the finished section
	return section;
}


/**
 * deletePage - requests the server to delete a page from the json data
 *
 * @param  {DOM Event} event the event that triggered the function call
 */
async function deletePage(event) {

	//check if they are sure they want to delete the page
	if(window.confirm('Are you sure you want to delte this page?')){

		//delete the page from local storage
		let pages = JSON.parse(localStorage.pages);
		let index = pages.findIndex((item)=>{
	    if(item.title == event.target.id){
	      return item;
	    }
	  });
	  let deleted = pages.splice(index, 1);
		localStorage.pages = JSON.stringify(pages);


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
		const data = {
			target: `${event.target.id}`
		};
		headers.body = JSON.stringify(data);

		try {
			//make our request to the server
			const response = await fetch('/deletePage', headers);

			//check for an error
			if (!response.ok)
				throw new Error(response.statusText);

			//if we don't get an error, alert the user and reload the previews
			window.alert('Page Deleted');
			loadPreviews()
			handleClientLoad();
		} catch (err) {

			//if we couldn't fetch log the error and let the user know
			console.log(err);
			window.alert('An error occurd, please try again.');
		}
	}
}


/**
 * addCalendarOption - Adds the option to display the calendar option
 * depending on whether or not the user is signed in to google
 *
 */
function addCalendarOption(){

	//get the parent article
	const article = document.querySelector('article');

	//create all of the relevant elemetns we will need
	const section = document.createElement('section');
	const div = document.createElement('div');
	const spacer = document.createElement('div');
	let radio = document.createElement('input');

	//setup the section
	section.classList.add('iframeContainer');
	section.id = 'calendar';

	//setup the otehr elements
	div.classList.add('preview');
	div.innerHTML = "<h1>Calendar</h1>";

	//apend the elements to their parent elements
	radio = setupRadio(radio, 'calendar');
	section.appendChild(spacer);
	section.appendChild(div);
	section.appendChild(radio);

	//insert the calendar option before the add option
	article.insertBefore(section, document.querySelector('.addButton'));
}


/**
 * removeCalendarOption - hides the calendar option if the user is no longer signed in
 *
 */ 
function removeCalendarOption(){
	if(document.getElementById('calendar')!= null){
		document.getElementById('calendar').remove();
	}
}
// window.onSignIn = (googleUser) => {
// 	document.body.classList.add('logged-in');
// 	getNextCalendarEvent(googleUser);
// }


//set initialise to run when the DOM is finished loading in
document.addEventListener('DOMContentLoaded', initialise);
