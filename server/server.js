'use strict'
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
let updateState = 'false';
// ... profit?

app.use('/', express.static('public/'));
app.use('/config', express.static('private/'));
app.use(express.json());
app.get('/updateState', function(req, res){
  res.responseType = 'text';
  res.send(updateState);
  if(updateState == 'true'){
    updateState = 'false'
  }
});

app.post('/update', function(req, res){
  console.log('update recieved');
  let src = req.body.target;
  console.log('body retireved');
  console.log('target is: '+ src);
  let srcHTMLPath = path.join(__dirname, '..', 'private', 'examples', src, src + '.html');
  let destHTMLPath = path.join(__dirname, '..', 'public', 'index.html');
  console.log('Set html paths');
  let srcCSSPath = path.join(__dirname, '..', 'private', 'examples', src, 'style.css');
  let destCSSPath = path.join(__dirname, '..', 'public', 'style.css');
  console.log('set css paths');
  fs.copyFile(srcHTMLPath, destHTMLPath, (err) => {
    if(err) throw err;
    console.log('HTML Copied');
  });
  fs.copyFile(srcCSSPath, destCSSPath, (err) => {
    if(err) throw err;
    console.log('CSS Copied');
  });
  updateState = 'true';
  res.send('state updated');
});

app.listen(8080);
