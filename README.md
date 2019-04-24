# Web Script Programming
This repository is home to the coursework for my university module "Web Script Programming."

The premise of this coursework is to have a web server that serves a page to an unattended display, which is controlled
from a configuration page that can be accessed through a specific URL to the server.

For my specific use case I chose to have the unattended display as an information tool on a lecturers office door, the idea
being to let students and staff know whether or not the lecturer is busy, available or wanting to display something potentially
inspirational to students an staff.

## What it does
### Unattended Display
At the moment, when the server is running, any requests to the root are responded to with a default page that is rendered using information pulled out of a database which is input into a corresponding embedded javascript file (.ejs) included in this file is a script that continuously checks with the server if an update has been sent from the configuration page. If there has been an update, the new page is displayed in the same manner. If no change has been made, the previous message stays displayed.
### Configuration Page
To access the config page, users must make a call to /config on the domain. At this point, the server responds with the required page which contains is composed of a title, and a collection of iframes, each displaying an individual uniques page based off of the entries in the database (Horrifically resource-inefficient I know - This will be addressed in the future).

To display any of the messages on the screen, simply click the radio button **_underneath_** the iframe

In addition to the configuration page, users can access a page that allows them to build their own messages to be displayed from 3 presets (Only 2 of which are currently implemented) -
  * Text
  * Quote
  * Image

This page is accessible via the + button at the end of the iframes.

When the user selects the template they want to use, the enter the data into the relevant boxes and then can either preview it, or save it into the database. (I highly recommend previewing it first although this is not enforced as of yet).

When the user then navigates back to the config page, it is updated with their new addition.

## Installing for Development
In order to work on this project, you will need the following prerequisites:
1. MariaDB v10.3.14^
2. node.js v10.15.1^
3. A copy of this repository

Once you have the above, in order to run tests on the project you will need to perform the following actions:
1. run ``` npm install ``` in the root directory of the project to install all of the dependencies.
2. edit the example config file to contain your database username and password, and rename it to config.js
3. run the command ``` npm run setup ``` this will create the corresponding database tables in MariaDB as described in bin/setup.js.
4. run the command ``` npm start ``` to start the server
5. In your browser of choice, navigate to localhost and localhost/config in two separate tabs.
6. ?? Profit!

## Design Rationale
When designing the system I decided to settle with a single server file that imported different files which each handle a different part of the servers load.

I did this because I felt it would be beneficial to split the functionality from an
implementation perspective as I could focus on one part of the functionality at a time, without getting lost in the existing elements I had already implemented.

This also makes it easier for maintainability as all of the functionality is split out.
***
Another decision I made was to keep the public files for the unattended display
separate form the files used for the configuration page. I decided to do this again so
that it was easier to see which files were used for the different parts of the system, as well as to ensure there were no mix-ups when routing the requests to the right place.
***
## Implementation Rationale
