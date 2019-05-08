# Web Script Programming
This repository is home to the coursework for my university module "Web Script Programming."

The premise of this coursework is to have a web server that serves a page to an unattended display, which is controlled
from a configuration page that can be accessed through a specific URL to the server.

For my specific use case I chose to have the unattended display as an information tool on a lecturers office door, the idea
being to let students and staff know whether or not the lecturer is busy, available or wanting to display something potentially
inspirational to students an staff.

## What it does
### Unattended Display
At the moment, when the server is running, any requests to the root are responded to with a default page, and a JSON array of page data. This page data is stored in the browsers localStoarge, and a script will by default show a 'technical difficulties' page. In the background, the script asks the server what page it needs to display, and compares that with the content of the title element of the current page displayed. If they are different, the script checks the localStorage for the page data which i found, gets displayed immediately, otherwise it requests the new JSON data from the server and then displays the new page. This is more efficient than the previous version, as there is no waiting for database calls on the server, and the content gets loaded directly into the webpage by replacing the inner html of the body element.
### Configuration Page
To access the config page, users must make a call to '/config' on the domain. The server responds with a set of static resources, and once the DOM has loaded on index.html a script runs that populates the page with previews of the different content you can display on the Unattended display.

This page also allows you to delete entries from the JSON data if there are templates you do not want.

To display any of the messages on the screen, simply click the radio button **_underneath_** the preview.

In addition to the configuration page, users can access a page that allows them to build their own messages to be displayed from 3 presets  -
  * Text
  * Quote
  * Image

This page is accessible via the + button at the end of the previews.

When the user selects the template they want to use, the enter the data into the relevant boxes and then can either preview it, or save it into the database. (I highly recommend previewing it first although this is not enforced as of yet).

Once the page has been submited to the server the user is redirected back to the configuration page.
## Installing for Development
In order to work on this project, you will need the following prerequisites:
1. node.js v10.15.1^
2. A copy of this repository

Once you have the above, in order to run tests on the project you will need to perform the following actions:
1. run ``` npm install ``` in the root directory of the project to install all of the dependencies.
2. run the command ``` npm start ``` to start the server
3. In your browser of choice, navigate to localhost and localhost/config in two separate tabs.
4. ?? Profit!

## Design Rationale
When designing the system I decided to settle with a single server file that imported different files which each handle a different part of the servers load.

I did this because I felt it would be beneficial to split the functionality from an
implementation perspective as I could focus on one part of the functionality at a time, without getting lost in the existing elements I had already implemented.

This also makes it easier for maintainability as all of the functionality is split out.
***
Another decision I made was to keep the public files for the unattended display
separate form the files used for the configuration page. I decided to do this again so
that it was easier to see which files were used for the different parts of the system,
as well as to ensure there were no mix-ups when routing the requests to the right place.

## Implementation Rationale
The intent of this project is to create a system that allows a lecturer to display messages on an unattended display located on their door, so that
they can communicate information on their current availability to both their students, and other members of staff.

***
