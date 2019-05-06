'use strict'
const express = require('express');
const fs = require('fs');
const pagesRouter = express.Router();

pagesRouter.get('/getJSON', sendJSON);
pagesRouter.post('/updateJSON', updateJSON);

async function sendJSON(req, res){
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if (err)
      throw err;
    let json = JSON.parse(data);
    json = json.pages;
    res.json(json);
  });
}

async function updateJSON(req, res){
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if (err)
      throw err;
    data = JSON.parse(data);
    let jsonArr = data.pages;
    console.log(oldJSON);
    const extraJSON = JSON.parse(req.body);
    jsonArr.push(extraJSON);
    data.pages = jsonArr;
    fs.appendFile('server/api/pages.json', data, 'utf-8', (err, data) =>{
      if(err)
        throw error
      console.log('JSON Updated successfully!');
    })
  });
}

module.exports = {
  pages: pagesRouter
}
