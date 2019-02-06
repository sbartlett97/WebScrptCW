'use strict'
const express = require('express');
const fs = require('fs');
const path = require('path');
let updateState = false;
const router = express.Router();
router.get('/updateState', function(req, res){
  res.responseType = 'text';
  res.send(updateState);
  if(updateState == 'true'){
    updateState = 'false'
    console.log('Dashboard Refreshed');
  }
});
router.post('/update', updateDashboard);


function updateDashboard(req, res){
  let src = req.body.target;
  let srcHTMLPath = path.join(__dirname, '..', 'webpages', 'private', 'examples', src, src + '.html');
  let destHTMLPath = path.join(__dirname, '..', 'webpages', 'public', 'index.html');
  let srcCSSPath = path.join(__dirname, '..', 'webpages', 'private', 'examples', src, 'style.css');
  let destCSSPath = path.join(__dirname, '..', 'webpages', 'public', 'style.css');
  fs.copyFile(srcHTMLPath, destHTMLPath, (err) => {
    if(err) throw err;
  });
  fs.copyFile(srcCSSPath, destCSSPath, (err) => {
    if(err) throw err;
  });
  updateState = 'true';
  res.send('state updated');
  console.log('Dashboard has been updated, waiting for refresh');
}

module.exports = router;
