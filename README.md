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

In addition to the configuration page, users can access a page that allows them to build their own messages to be displayed from 3 presets (Only 2 of which are currently implemented) -
  * Text
  * Quote
  * Image

When the user selects the template they want to use, the enter the data into the relevant boxes and then can either preview it, or save it into the database. (I highly recommend previewing it first although this is not enforced as of yet).
