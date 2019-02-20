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

dashboard.use('/', express.static(`./webpages/public/${destPage}/`));
dashboard.use('/comeIn', express.static('./webpages/public/comeIn'));
dashboard.use('/brb', express.static('./webpages/public/brb'));
dashboard.use('/noDisturb', express.static('./webpages/public/noDisturb'));
dashboard.use('/sw', express.static('./webpages/public/sw'));



// setDeafualtRoot();
module.exports = {
  router: router,
  dashboard: dashboard
};
