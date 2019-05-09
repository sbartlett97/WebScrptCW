'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const express = require('express');
const fs = require('fs');
const pagesRouter = express.Router();
const calendarEvents = {events:[]};
const pagesJSON = require('./pagesData');
const multer = require('multer');
const handler = require('./model');
const imgRouter = express.Router();
const uploader = multer({
  dest: 'public/images/',
  limits: {
    fields: 10,
    fileSize: 1024*1024*20,
    files: 1
  }
});

imgRouter.post('/upload', uploader.single('picfile'), uploadPicture);
pagesRouter.get('/getJSON', sendJSON);
pagesRouter.get('/calendar', sendCalendarEvents);
pagesRouter.post('/updateJSON', addTextPage);
pagesRouter.post('/calendarEvents', initCalendarJSON);
pagesRouter.delete('/deletePage', deletePage);

async function sendJSON(req, res){
    let json = pagesJSON.pages;
    res.set('Cache-Control', 'private, max-age=31557600');
    res.json(json);
}

async function addTextPage(req, res){
  pagesJSON.pages.push(req.body);
  await updatePagesJSON();
  res.send();
}

async function deletePage(req, res){
  const toDelete = req.body.target;
  let index = pagesJSON.pages.findIndex((item)=>{
    if(item.title == toDelete){
      return item;
    }
  });
  pagesJSON.pages.splice(index, 1);
  updatePagesJSON();
  res.send();
}

async function initCalendarJSON(req, res){
  let calEvents = req.body.events;
  console.log(calEvents);
  calendarEvents.events = calEvents;
  res.send();
}

function sendCalendarEvents(req, res){
  res.set('Cache-Control', 'private, max-age=31557600');
  res.json(calendarEvents.events);
}

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

function error(res, msg){
  res.sendStatus(500);
  console.error(msg);
}

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
