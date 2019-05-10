'use strict'


/**
 * getCalendarData - gets the calendar JSON from the server and saves it to local storage
 *
 */
async function getCalendarData(){
  let res = await fetch('/calendar');
  let calendarArray = await res.json();
  localStorage.calendarData = JSON.stringify(calendarArray);
}


/**
 * displayNextEvent - gets the next calendar event from local storage and displays it
 * on the page
 *
 */
function displayNextEvent(){

  //pull data out of local storage
  let events = JSON.parse(localStorage.calendarData);

  //check if we have any events
  if(events.length < 1){

    //if not load a default page
    loadPage('brb');
  }else{

    //get the event title and setup basic variables for other data
    let eventTitle = events[0].title;
    eventTitle = eventTitle.toUpperCase();
    let title, when, where, subject;

    //check if the title includes the word 'meeting'
    if(eventTitle.includes('MEETING')){

      //if so set title to I'm in a metting
      title = 'Im currently in a meeting'

      //get the rest of the data and display it
      where = events[0].where;
      when = `${events[0].start}-${events[0].end}`;
      subject = '';

    //not in a meeting
    }else{

      //set the title
      title = 'I\'m currently in a lecture'

      //load the rest of the data
      where = events[0].where;
      when = `${events[0].start}-${events[0].end}`;
      subject = events[0].title;
    }

    //popoulate the page with the data from local storage
    let div = document.getElementById('calendar')
    div.innerHTML = `<h1>${title}</h1><h2 id="subject">${subject}</h2><h2 id="location">${where}</h2><h2 id="time">${when}</h2>`;

    //remove the event from the calendar array and save it back in local storage
    events.shift();
    localStorage.calendarData = JSON.stringify(events);
  }
}

// function checkNextEvent(){
//   const events = JSON.parse(localStorage.calendarD// ata);
//   let today = new Date(Date.now());
//   console.log(events);
//   console.log(document.title);
//   if(document.title =='calendar'){
//     let currentEventTime = document.getElementById('time').innerHTML;
//     let startEndTime = currentEventTime.split('-');
//     let endHours = startEndTime[1].split(':')[0];
//     let nextStartHours = events[0].start.split(':')[0];
//     if(Number(endHours) == Number(nextStartHours) -1 || Number(endHours) == Number(nextStartHours)){
//       if(events[0].date == `${today.getDate()}/${today.getMonth()}`){
//         displayNextEvent();
//       }else{
//         loadPage('brb');
//       }
//     }else{
//       loadPage('brb');
//     }
//   }
// }


/**
 * populateCalendar - runs getCalendarData() and displayNextEvent()
 *
 */
function populateCalendar(){
  getCalendarData();
  displayNextEvent();
}
