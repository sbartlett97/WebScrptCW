'use strict'
/*
UP777815 Web Script Coursework 2019
*/

//setup constants and import modules
const express = require('express');
const fs = require('fs');
const pagesRouter = express.Router();
const calendarEvents = {events:[]};
const pagesJSON = require('./pagesData');
const multer = require('multer');
const handler = require('./model');
const imgRouter = express.Router();

//setup the image upload handler
const uploader = multer({
  dest: 'public/images/',
  limits: {
    fields: 10,
    fileSize: 1024*1024*20,
    files: 1
  }
});


//setup the paths the routers are listening on and their callbacks
imgRouter.post('/upload', uploader.single('picfile'), uploadPicture);
pagesRouter.get('/getJSON', sendJSON);
pagesRouter.get('/calendar', sendCalendarEvents);
pagesRouter.post('/updateJSON', addTextPage);
pagesRouter.post('/calendarEvents', initCalendarJSON);
pagesRouter.delete('/deletePage', deletePage);



/**
 * sendJSON - sends the JSON page data to the requester
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
async function sendJSON(req, res){
    let json = pagesJSON.pages;
    res.set('Cache-Control', 'private, max-age=31557600');
    res.json(json);
}



/**
 * addTextPage - adds a text page to the JSON data and writes it to file for persistence
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
async function addTextPage(req, res){
  pagesJSON.pages.push(req.body);
  updatePagesJSON();
  res.send();
}



/**
 * deletePage - Deletes a page from the JSON data and writes it to file for persistence
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
async function deletePage(req, res){
  const toDelete = req.body.target;
  let index = pagesJSON.pages.findIndex((item)=>{
    if(item.title == toDelete){
      return item;
    }
  });
  let deleted = pagesJSON.pages.splice(index, 1);
  console.log(deleted);
  if(deleted.data.type == 'image'){
      handler.deletePicture(deleted[0].data.url)
  }
  updatePagesJSON();
  res.send();
}



/**
 * initCalendarJSON - Populate the calendar JSON object with data from config page
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
async function initCalendarJSON(req, res){
  let calEvents = req.body.events;
  console.log(calEvents);
  calendarEvents.events = calEvents;
  res.send();
}



/**
 * sendCalendarEvents - Sends the calendar JSON to the unattended display
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
function sendCalendarEvents(req, res){
  res.set('Cache-Control', 'private, max-age=31557600');
  res.json(calendarEvents.events);
}



/**
 * uploadPicture - handles picture uploads for image pages
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
async function uploadPicture(req, res){
  try{
    const retval = await handler.uploadPicture(req.file, req.body.title);
    let newPage = {title: `${req.body.title}`,data: {type: 'image',url: `${retval}`}};
      pagesJSON.pages.push(newPage);
      res.redirect(303, '/config');
  }catch(e){
    error(res, e);
  }
}



/**
 * error - handles errors
 *
 * @param  {type} req the request object
 * @param  {type} res the response object
 */
function error(res, msg){
  res.sendStatus(500);
  console.error(msg);
}



/**
 * updatePagesJSON - updates the pagesData json file
 *
 */
function updatePagesJSON(){
  fs.writeFile('server/api/pagesData.json', JSON.stringify(pagesJSON), 'utf-8', (err, data)=>{
    if(err)
      throw err
    console.log('updated pages json');
  });
}

module.exports = {
  pages: pagesRouter,
  imgRouter: imgRouter
}
