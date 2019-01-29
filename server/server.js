'use strict'
const express = require('express');
const app = express();
const path = require('path');
let updateState = 'false';
// ... profit?

app.use('/', express.static('public/'));

app.get('/updateState', function(req, res){
  res.responseType = 'text';
  res.send(updateState);
  if(updateState == 'true'){
    updateState = 'false'
  }
});

app.get('/update', function(req, res){
  updateState = 'true';
  res.send('state updated');
  console.log(updateState);
});

app.use('/config', express.static(path.join(__dirname, '..', 'private')))
app.listen(8080);
