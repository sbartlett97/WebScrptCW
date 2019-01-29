'use strict'
const express = require('express');
const app = express();
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

app.use('/config', express.static('private/'));
app.listen(8080);
