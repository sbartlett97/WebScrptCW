# Reflection
## Process
The use case for my project was to have an unattended display mounted on or next to a
lecturers office door, on which they would be able to display messages to the other staff
and their students relating to their availability, or words of encouragement during stressful
exam periods.

When I started the project, I didn't take much time to thoroughly plan what I wanted the
API to look like, and rushed straight in with the development, with a plan of figuring things out
as I went on. Because of this, my initial application was not very well structured, and was
employing some very questionable methods for updating the page displayed on the unattended display,
such as copying an index.html file and its css file from the filesystem, and replacing an existing
file in the public static route.

I soon realised this was not a very good practice to be employing and moved on to a different
method. After searching the web, I came across a package called EJS, which allows the use of
special tags that could be used alongside html to perform logic checks, as well as load in
ore-templated chunks of code. I thought this would be very beneficial, as I could have a single
template file for the pages to be displayed, and pass in different values that would then be
dynamically loaded into the DOM and thus displayed on the unattended display.

After I got a version of this fleshed out, I wanted to add the ability for users to create
their own pages, and decided I would need to modify the way I was loading the data into the page.
From this, I decided to use a database and unlike the start of the project, I took time to take
the time to design the database scheme so that it would work properly, have a logical and easy to
understand structure, and handle everything I needed it to which gave me 3 tables - 1 for storing
the page names and an auto-incremented id, one that contained the type the page was and what its
content was, and another that held any specific styling for a page all of which was linked with a
secondary key to the original page id.

This method worked incredibly well, however there was a lot of load being put on the server and there was also a lot of repeated code for getting and saving database entries, as well as a lot
of code nested in closures that were very messy. On top of this, when I made my decision to use
EJS, I had forgotten that for the project we were not allowed to use any pre-processing libraries,
which a friend kindly pointed out EJS was, so I had to find another way of displaying the content
and thus rework the entire system.   

Finally I came into the idea of simply changing the internalHTML of the body element on the client
side. This would be useful as I could now split the load that was on the server between it and the
client, as previously the server had to do all the work due to an issue with EJS not working
client side. Once the changes were made and the application was once again functioning, I decided
I would try and make it more efficient, and as databases and constantly requesting data from a
server isn't very efficient, I needed a new way of doing everything and it was whilst I was going back through some of the past lectures that I remembered about JSON, and local storage.

From this, I created a pagesData.json document that would hold all of the page data that I would
need. To begin with, replaced all of the database SELECT queries with fs.readFile, and was reading the entire file, parsing it to JSON, manipulating the data in some way, and then saving it again
whenever there was an API call to get or save data, which again was cumbersome and messy but worked. Towards the end of the project, it became clear that I had been an idiot and there was a much easier and quicker way to get the data and reduce the amount of time the server spends on
manipulating the filesystem, and this was to import pagesData.json as a variable, and pull the
data directly from it, only saving back to the file as a persistent store when we add or delete a
page so that we have data persistence between restarts, and this method is the final version of the system.

## What I would do differently
If I were to do this project again, I would spend a lot more time planning what I would like the
data-structures to look like, as well as what the API should look like so that when it came to the development there was a set structure to follow and I didn't waste time tracing the data through the code, and don't waste time creating inefficient versions that I will only have to re-write further down the line.

In addition to this, I would spend more time working on the project over a longer period of time,
rather than doing a lot of work in a very short space of time. I would also do better research 
into the libraries I intend on using so that I can make sure that I am using the most appropriate 
one for the job, as well as one that is in a stable build and will work on multiple operating 
systems. 
