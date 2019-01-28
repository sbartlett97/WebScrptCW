'use strict'
const express = require('express');
const app = express();
const path = require('path');

// ... profit

app.use(express.static('public'));
app.get('/updateState', function(req, res){
  console.log('request recieved');
  res.send('Hello');
  console.log('request complete');
});

app.get('/config', function(req, res){
  res.sendfile(path.join(__dirname, '..', '/private', '/settings.html'));
});



app.listen(8080);
