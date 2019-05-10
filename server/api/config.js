'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const express = require('express');
const updater = express.Router();
const config = require('./config');
let nextPage = 'technicalDifficulties';

updater.post('/update', function(req, res){
  console.log('recieved update');
  nextPage = req.body.target;
  console.log(nextPage);
  res.send('update completed');
});

updater.get('/getAPI', (req, res)=>{
  res.json({key: config.apiKey});
});

updater.get('/update', function(req, res){
  console.log('updating display');
  res.send(nextPage);
})

module.exports = {
  updater: updater
}
