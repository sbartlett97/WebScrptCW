'use strict'
const express = require('express');
const router = express.Router();
const dashboard = express.Router();
router.post('/update', updateDashboard);
router.get('/checkUpdate', checkUpdate);
const defaultPage = 'comeIn';
let destPage;


function updateDashboard(req, res){
  console.log('update recieved');
  destPage = req.body.target;
  console.log(destPage);
}

async function checkUpdate(req, res){
    res.send(destPage);
}

dashboard.get('/:dest/:source?', renderFragment);
dashboard.get('/', handleDefault);

async function handleDefault(req, res){
  res.redirect(`${defaultPage}/`);
}

async function renderFragment(req, res){
  const source = req.params['source'];
  const nextPage = req.params['dest'];
  if (!nextPage){
    res.render(`pages/${defaultPage}/index`, {
      source: source
    });
  }else{
    res.render(`pages/${nextPage}/index`, {
      source: source
    });
  }
}

module.exports = {
  router: router,
  dashboard: dashboard
};
