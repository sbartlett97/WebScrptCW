'use strict'

async function getCalendarData(){
  let res = await fetch('/calendar');
  let calendarArray = await res.json();
  localStorage.calendarData = JSON.stringify(calendarArray);
}

function displayNextEvent(){
  let events = JSON.parse(localStorage.calendarData);
  if(events.length < 1){
    loadPage('brb');
  }else{
    let eventTitle = events[0].title;
    eventTitle = eventTitle.toUpperCase();
    let title, when, where, subject;
    if(eventTitle.includes('MEETING')){
      title = 'Im currently in a meeting'
      where = events[0].where;
      when = `${events[0].start}-${events[0].end}`;
      subject = '';
    }else{
      title = 'I\'m currently in a lecture'
      where = events[0].where;
      when = `${events[0].start}-${events[0].end}`;
      subject = events[0].title;
    }
    let div = document.getElementById('calendar')
    div.innerHTML = `<h1>${title}</h1><h2 id="subject">${subject}</h2><h2 id="location">${where}</h2><h2 id="time">${when}</h2>`;
    events.shift();
    localStorage.calendarData = JSON.stringify(events);
  }
}

// function checkNextEvent(){
//   const events = JSON.parse(localStorage.calendarData);
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


function populateCalendar(){
  getCalendarData();
  displayNextEvent();
}
