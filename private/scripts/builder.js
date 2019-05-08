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

//function to display popup
function div_show(form) {
	document.getElementById(form).style.display = "block";
}
//function to hide popup
function div_hide(form) {
	document.getElementById(form).style.display = "none";
}
function resetBorders(prefix){
  document.getElementById(`${prefix}Name`).style = "";
  document.getElementById(`${prefix}Msg`).style = "";
  document.getElementById(`${prefix}TextColor`).style = "";
  document.getElementById(`${prefix}Background`).style = "";
}

function checkInputs(action, type) {
  resetBorders(type.charAt(0))
  const errors = checkValues(type.charAt(0));
  if(errors.errorOn == "none"){

    const text = document.getElementById(`${type.charAt(0)}Msg`).value;
    const textColor = (document.getElementById(`${type.charAt(0)}TextColor`).value?document.getElementById(`${type.charAt(0)}TextColor`).value:'black');
    const backgroundColor = (document.getElementById(`${type.charAt(0)}Background`).value?document.getElementById(`${type.charAt(0)}Background`).value:'white');

    if(action == "preview" && type == "text"){

      const preview = document.getElementById('templateViewer');
      preview.style = `text-align: center; color:${textColor}; background-color: ${backgroundColor}; padding-top: 200px;`;
      preview.innerHTML = `<h1>${text}</h1>`;

    }else if(action == "preview" && type == "quote"){

      //create an array of the text from message box, splitting on '-'
      let texts = text.split('-');

      //get the preview div
      const preview = document.getElementById('templateViewer');

      //load the data into the preview div
      preview.style = `padding-top: 200px; text-align: center; color:${color}; background-color: ${background}`;
      preview.innerHTML = `<h1>${texts[0]}</h1><h2 style="background-color: none; font-style: italic;">-${texts[1]}</h2>`;

    }else{
      sendToServer(tpye.charAt[0]);
    }
    div_hide(type);
  }else{
    switch(errors.errorOn){
      case "message":
        window.alert('Please enter a valid Message for the page!');
        document.getElementById(`${type.charAt(0)}Msg`).style = 'border: 2px solid red;transition: border 0.1s ease ';
        break;
      case "name":
        window.alert('Please enter a valid Name for the page!');
          document.getElementById(`${type.charAt(0)}Name`).style = 'border: 2px solid red;transition: border 0.1s ease ';
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


function checkValues(templatePrefix) {
	const validName = /\w{1}.+/.test(document.getElementById(`${templatePrefix}Name`).value);
	let validMessage;
	if (templatePrefix == 'q') {
		if (/\w{1}.+/.test(document.getElementById(`${templatePrefix}Msg`).value) || !document.getElementById(`${templatePrefix}Msg`).value.includes('-')) {
			validMessage = false;
		} else {
			validMessage = true;
		}
	} else {
		validMessage = /\w{1}.+/.test(document.getElementById(`${templatePrefix}Msg`).value);
	}
	const validTextColor = checkCSSColor(document.getElementById(`${templatePrefix}TextColor`).value);
	const validBackgroundColor = checkCSSColor(document.getElementById(`${templatePrefix}Background`).value);
  if(!validMessage) return {errorOn: "message"};
  if(!validName) return {errorOn: "name"};
  if(!validTextColor) return {errorOn: "textColor"};
  if(!validBackgroundColor) return {errorOn: "backgroundColor"};
  return {errorOn: "none"};
}


function checkCSSColor(colorValue) {
	if (/^#[A-Fa-f0-9]{6}$/.test(colorValue) || /^#[A-Fa-f0-9]{3}$/.test(colorValue)) {
		return true;
	} else if (/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(colorValue)) {
		return true;
	} else if (/rgb\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*\)/.test(colorValue)) {
		return true;
	} else if (/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/.test(colorValue)) {
		return true;
	} else if (/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(colorValue)) {
		return true;
	} else if(cssColors.includes('colorValue')){
    return true;
	}else if(colorValue == "" || colorValue == " "){
    return true;
  }else{
    return false;
  }
}

async function sendToServer(prefix) {
	if (prefix == "t" || prefix == "q") {
		const page = {};
		page.title = `${removeSpaces(document.getElementById(`${prefix}Name`).value)}`;
		page.data = {}
		page.data.background = (document.getElementById(`${prefix}Background`).value ? document.getElementById(`${prefix}Background`).value : 'white');
		page.data.font = (document.getElementById(`${prefix}TextColor`).value ? document.getElementById(`${prefix}TextColor`).value : 'black');
		if (prefix == 't') {
			page.data.text = `${document.getElementById(`${prefix}Msg`).value}`;
			page.data.type = 'text';
		} else {
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

function removeSpaces(text) {
	let textArray = text.split(' ');
	text = '';
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
