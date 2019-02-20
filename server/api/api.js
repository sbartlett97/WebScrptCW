'use strict'
const express = require('express');
const router = express.Router();
const dashboard = express.Router();
router.post('/update', updateDashboard);
let destPage = 'comeIn';

router.get('/nextPage', sendDestination);
function updateDashboard(req, res){
  console.log('update recieved');
  destPage = req.body.target;
  console.log(destPage);
  updateRootPath();
}

function sendDestination(req, res){
  res.send(destPage);
}

dashboard.get('/:dest', function(req, res){
  const destPage = req.params['dest'];
  res.render(`pages/${destPage}/index`);
})




// setDeafualtRoot();
module.exports = {
  router: router,
  dashboard: dashboard
};
