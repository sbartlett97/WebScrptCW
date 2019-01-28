'use strict'
const express = require('express');
const app = express();
const path = require('path');

// ... profit

app.use('/', express.static('public/'));
app.get('/updateState', function(req, res){
  console.log('request recieved');
  res.send('Hello');
  console.log('request complete');
});
app.use('/config', express.static(path.join(__dirname, '..', 'private')))
// app.get('/config', function(req, res){
//   res.sendFile(path.join(__dirname, '..', '/private/'));
// });



app.listen(8080);