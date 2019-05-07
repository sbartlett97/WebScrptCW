'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const express = require('express');
const updater = express.Router();
let nextPage = 'technicalDifficulties';

updater.post('/update', function(req, res){
  console.log('recieved update');
  nextPage = req.body.target;
  res.send('update completed');
});

updater.get('/update', function(req, res){
  console.log('updating display');
  res.send(nextPage);
})

module.exports = {
  updater: updater
}
