'use strict'
async function check_empty(sender, type) {
  if (checkInputs(type)){
    console.log(sender, type);
    let name, msg, bg, col;
    if(type == "text"){
      console.log('building text!');
      name = document.getElementById('tName').value;
      msg = document.getElementById('tMsg').value;
      bg = document.getElementById('tBackground').value;
      col = document.getElementById('tTextColor').value;
    }else if(type == "quote"){
      console.log("building Quote!");
      name = document.getElementById('qName').value;
      msg = document.getElementById('qMsg').value;
      bg = document.getElementById('qBackground').value;
      col = document.getElementById('qTextColor').value;
    }else{
      console.log(type);
    }
    if(sender == "preview"){
      const res = await fetch(`/preview/${type}/${name}/${msg}/${bg}/${col}`);
      const html = await res.text();
      document.getElementById('templateViewer').srcdoc = html;
    }else {
      let res = await fetch(`/addToDB/${type}/${name}/${msg}/${bg}/${col}`);
    }
  }else {
    alert("Fill All Fields !");
  }
  alert("Form Submitted Successfully...");
  div_hide(type);
}


function checkInputs(type){
  if (type=="text"){
    if (document.getElementById('tName').value == "" || document.getElementById('tMsg').value == "" || document.getElementById('tBackground').value == "" || document.getElementById('tTextColor') == "") {
      return false;
    }else{
      return true;
    }
  }else if (type == "quote"){
    if (document.getElementById('qName').value == "" || document.getElementById('qMsg').value == "" || document.getElementById('qBackground').value == "" || document.getElementById('qTextColor') == "") {
      return false;
    }else{
      return true;
    }
  }
}
//Function To Display Popup
function div_show(form) {
  document.getElementById(form).style.display = "block";
}
//Function to Hide Popup
function div_hide(form){
  document.getElementById(form).style.display = "none";
}
