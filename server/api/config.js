'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const express = require('express');
const updater = express.Router();
const config = require('./config');
let nextPage = 'technicalDifficulties';



/**
 * updater - description
 *
 * @param  {String} '/update'  the path the request happens on
 * @param  {Function} function(req, res) the callback to be performed on this path
 */
updater.post('/update', function(req, res){

  //log that we have recieved an update from the config page
  console.log('recieved update');

  //set the enxt page vaariable
  nextPage = req.body.target;

  //send status
  res.send('update completed');
});


/**
 * updater - description
 *
 * @param  {type} '/update'    path the request happens on
 * @param  {type} function(req,res) callback to be performed on request
 */
updater.get('/update', function(req, res){

  //log that the unattended display has requested an updat
  console.log('updating display');

  //send the next page to the display
  res.send(nextPage);
})


module.exports = {
  updater: updater
}
