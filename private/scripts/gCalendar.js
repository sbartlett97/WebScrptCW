// Client ID and API key from the Developer Console
let CLIENT_ID = '44562083234-m0f6spthlvv8k88p2et1j9637e8tt68t.apps.googleusercontent.com';
let API_KEY = 'AIzaSyBI51jKXLkpWZgLAl5HWNwljlzjw6c_xsA';

// Array of API discovery doc URLs for APIs used by the quickstart
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
let SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    window.alert(error);
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    addCalendarOption();
    getUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    removeCalendarOption();
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function getUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    let events = response.result.items;
    const calEvents = {
      events: []
    }
    if (events.length > 0) {
      events.forEach((calEvent)=>{
        let start = new Date(calEvent.start.dateTime);
        let end = new Date(calEvent.end.dateTime);
        let nextEvent = {
          date: `${start.getDate()}/${start.getMonth()}`,
          title: calEvent.summary,
          start: `${start.getHours()}:${start.getMinutes()}0`,
          end: `${end.getHours()}:${end.getMinutes()}0`,
          where: calEvent.location
        }
        calEvents.events.push(nextEvent);
      });
      localStorage.calendarEvents = JSON.stringify(calEvents);
      sendCalenderEvents();
    } else {
    }
  });
}

async function sendCalenderEvents(){
  let headers = {
      method: "POST",
    	mode: "cors",
    	cache: "no-cache",
    	headers: {
    		"Content-Type": "application/json",
    	}
    }
  headers.body = localStorage.calendarEvents;
  try{
    let res = await fetch('/calendarEvents', headers);
  }catch(e){
    window.alert('tehere was an error sending the calendar data ' + error);
  }
}
