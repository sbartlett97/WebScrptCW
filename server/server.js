'use strict'
let express = require('express')
const app = express()

// ... profit

app.use(express.static('public'));
app.get('/updateState', function(req, res){
  res.status = 200;
  res.responseText = 'Completed';
  res.send();
})




app.listen(8080)
