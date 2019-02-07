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
  copyFile(src, 'html');
  copyFile(src, 'css');
  updateState = 'true';
  res.send('state updated');
  console.log('Dashboard has been updated, waiting for refresh');
}

function copyFile(src, ext){
  let file = ext == 'html' ? 'index' : 'style';
  let source = path.join(__dirname, '..', '..', 'webpages', 'private', 'examples', src, `${file}.${ext}`);
  let destination = path.join(__dirname, '..', '..', 'webpages', 'public', `${file}.${ext}`);
  fs.copyFile(source, destination, (err) => {
    if(err) throw err;
    console.log(`${ext} File Copied`);
  });
}
module.exports = router;
