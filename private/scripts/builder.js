'use strict'
/*
UP777815 Web Script Coursework 2019
*/

//setupt headers for sending data to the server
const updateHeaders = {
	method: "POST",
	mode: "cors",
	cache: "no-cache",
	headers: {
		"Content-Type": "application/json",
	}
}


/**
 * div_show - shows an input form
 *
 * @param  {String} form The id of the form to be shown
 */
function div_show(form) {
	document.getElementById(form).style.display = "block";
}


/**
 * div_hide - hides an input form
 *
 * @param  {String} form The id of the form to be hidden
*/
function div_hide(form) {
	document.getElementById(form).style.display = "none";
}

//reset any highlighted errors
function resetBorders(prefix) {
	document.getElementById(`${prefix}Name`).style = "";
	document.getElementById(`${prefix}Msg`).style = "";
	document.getElementById(`${prefix}TextColor`).style = "";
	document.getElementById(`${prefix}Background`).style = "";
}


/**
 * checkInputs - calls a funciton to validate inputs and previews/sends the data dependant on the button that calls it
 *
 * @param  {String} action Preview/send - identifies whether we are sending data or previewing it
 * @param  {String} type   text/quote/image - identifies the type of the page we are creating
 */
function checkInputs(action, type) {

	//check if we are dealing with an image
	if (type == 'img') {

		//make sure we have a name for the image as well as an image
		if (/\w{1}.+/.test(document.getElementById('iName').value) && document.getElementById('iImg').files[0] != null) {

			//create a new file reader and get the file from the input element
			let reader = new FileReader();
			let file = document.getElementById('iImg').files[0]

			//create a closure to read the file as a url
			reader.onload = (function (file) {
				return function (e) {
					// Render the picture in the preview element
					let previewer = document.getElementById('templateViewer');
					previewer.style = `background-image: url('${e.target.result}');background-repeat: no-repeat; background-size:fill`;
				};
			})(file);
			// Read in the image file as a data URL.
			reader.readAsDataURL(file);

			//hide the input div when we are done
			div_hide(type);
		} else {

			//aler the user to any errors
			window.alert('Please check the input fields');
		}
	} else {

		//reset any error styling
		resetBorders(type.charAt(0))

		//check the inputs for errors
		const errors = checkValues(type.charAt(0));

		//if there are no errros
		if (errors.errorOn == "none") {

			//get the data from the input elements
			const text = document.getElementById(`${type.charAt(0)}Msg`).value;
			const textColor = (document.getElementById(`${type.charAt(0)}TextColor`).value ? document.getElementById(`${type.charAt(0)}TextColor`).value : 'black');
			const backgroundColor = (document.getElementById(`${type.charAt(0)}Background`).value ? document.getElementById(`${type.charAt(0)}Background`).value : 'white');

			//check what we are doing
			if (action == "preview" && type == "text") {

				//add the required html to the preview element
				const preview = document.getElementById('templateViewer');
				preview.style = `text-align: center; color:${textColor}; background-color: ${backgroundColor}; padding-top: 200px;`;
				preview.innerHTML = `<h1>${text}</h1>`;

			} else if (action == "preview" && type == "quote") {

				//create an array of the text from message box, splitting on '-'
				let texts = text.split('-');

				//get the preview div
				const preview = document.getElementById('templateViewer');

				//load the data into the preview div
				preview.style = `padding-top: 200px; text-align: center; color:${color}; background-color: ${background}`;
				preview.innerHTML = `<h1>${texts[0]}</h1><h2 style="background-color: none; font-style: italic;">-${texts[1]}</h2>`;

			} else {
				//if we are not doing a preview, we are sending the data to the server
				sendToServer(type.charAt(0));
			}

			//hid the open input popup
			div_hide(type);

		} else {


			//if we get an error, check the error case  and upadte input styling to reflect errors
			switch (errors.errorOn) {
			case "name":
				window.alert('Please enter a valid Name for the page!');
				document.getElementById(`${type.charAt(0)}Name`).style = 'border: 2px solid red;transition: border 0.1s ease ';
				break;
			case "message":
				window.alert('Please enter a valid Message for the page!');
				document.getElementById(`${type.charAt(0)}Message`).style = 'border: 2px solid red;transition: border 0.1s ease ';
				break;
			case "textColor":
				window.alert('Please enter a valid text color for the page!');
				document.getElementById(`${type.charAt(0)}TextColor`).style = 'border: 2px solid red;transition: border 0.1s ease ';
				break;
			case "backgroundColor":
				window.alert('Please enter a valid background color for the page!');
				document.getElementById(`${type.charAt(0)}Background`).style = 'border: 2px solid red; transition: border 0.1s ease ';
				break;
			default:
			}
		}
	}
}


/**
 * checkValues - check the input values for errors
 *
 * @param  {Char} templatePrefix prefix for the id of the input fields
 * @return {JSON Object}         object containing the field there is an error on or none
 */
function checkValues(templatePrefix) {

	//check input string agains a regex of one or more letters
	const validName = /\w{1}.+/.test(document.getElementById(`${templatePrefix}Name`).value);
	let validMessage;

	//same check for message, but cheking for a '-' if we are making a quote
	if (templatePrefix == 'q') {
		if (/\w{1}.+/.test(document.getElementById(`${templatePrefix}Msg`).value) || !document.getElementById(`${templatePrefix}Msg`).value.includes('-')) {
			validMessage = false;
		} else {
			validMessage = true;
		}
	} else {
		validMessage = /\w{1}.+/.test(document.getElementById(`${templatePrefix}Msg`).value);
	}

	//check the colors input to the font and backround fields
	const validTextColor = checkCSSColor(document.getElementById(`${templatePrefix}TextColor`).value);
	const validBackgroundColor = checkCSSColor(document.getElementById(`${templatePrefix}Background`).value);

	//check if there were any errors and return the reuslt
	if (!validMessage) return {
		errorOn: "message"
	};
	if (!validName) return {
		errorOn: "name"
	};
	if (!validTextColor) return {
		errorOn: "textColor"
	};
	if (!validBackgroundColor) return {
		errorOn: "backgroundColor"
	};
	return {
		errorOn: "none"
	};
}


/**
 * checkCSSColor - function for checking an innput string against all possible color values
 *
 * @param  {string} colorValue input string to be checked
 * @return {Boolean}            true or false depending on result of checks
 */
function checkCSSColor(colorValue) {

	//check if string is a valid hexadecimal value
	if (/^#[A-Fa-f0-9]{6}$/.test(colorValue) || /^#[A-Fa-f0-9]{3}$/.test(colorValue)) {
		return true;

		//check if string is a valid rgba() value
	} else if (/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(colorValue)) {
		return true;

		//check if string is a valid rgb() value
	} else if (/rgb\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*\)/.test(colorValue)) {
		return true;

		//check if string is a valid hsl() value
	} else if (/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/.test(colorValue)) {
		return true;

		//check if string is a valid hsla() value
	} else if (/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(colorValue)) {
		return true;

		//check if string is an accepted css color string (escaping capital letter)
	} else if (cssColors.includes(colorValue.toLowerCase())) {
		return true;

		//if we have no value then we will be using the default value later
	} else if (colorValue == "" || colorValue == " ") {
		return true;
	} else {
		return false;
	}
}


/**
 * sendToServer - creates a JSON object of the page data to be sent to the server
 *
 * @param  {Char} prefix prefix for the relevant input id's so we can get the right data
 */
async function sendToServer(prefix) {

	//create an empty object
	const page = {};

	//pull the name from the input and remove spaces from its name, adding it as the page title value
	page.title = `${removeSpaces(document.getElementById(`${prefix}Name`).value)}`;

	//create the data object inside the page object and populate it with the input data
	page.data = {}

	//ternary checks to see if we need the default values
	page.data.background = (document.getElementById(`${prefix}Background`).value ? document.getElementById(`${prefix}Background`).value : 'white');
	page.data.font = (document.getElementById(`${prefix}TextColor`).value ? document.getElementById(`${prefix}TextColor`).value : 'black');

	//check if we are dealung with a text or quote page
	if (prefix == 't') {
		page.data.text = `${document.getElementById(`${prefix}Msg`).value}`;
		page.data.type = 'text';
	} else {

		//if we are dealing with a quote, split the text and the author
		let text = document.getElementById('qMsg').value.split('-');
		page.data.text = `${text[0]}`;
		page.data.author = `${text[1]}`
		page.data.type = 'quote';
	}

	//add our new objct to the request body
	updateHeaders.body = JSON.stringify(page);

	//send our POST request
	let res = await fetch('/updateJSON', updateHeaders);

	//redirect back to the config page
	window.location = '/config';
}


/**
 * removeSpaces - function for removing spaces from the page titles
 *
 * @param  {String} text description
 * @return {String}      description
 */
function removeSpaces(text) {

	//split the text into an arry on spaces and create a new variable for the text
	let textArray = text.split(' ');
	text = '';
	//loop through the array and camel case the string
	textArray.forEach(function (item, index) {
		if (index > 0) {
			let newItem = item.charAt(0).toUpperCase() + item.slice(1);
			text = text + newItem;
		} else {
			text = item
		}
	});
	return text;
}

//whenever we load the page builder, tell the config page we need to refresh the JSON data
document.onload = function () {
	localStorage.update = true;
}
