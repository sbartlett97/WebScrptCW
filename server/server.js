'use strict'
let express = require('express')
const app = express()

// ... profit

app.use(express.static('public'));
app.get('/updateState', function(req, res){
  console.log('request recieved');
  res.send('Hello');
  console.log('request complete');
})




app.listen(8080)
