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
  console.log(req.body);
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if (err)
      throw err;
    data = JSON.parse(data);
    let jsonArr = data.pages;
    const extraJSON = req.body;
    jsonArr.push(extraJSON);
    data.pages = jsonArr;
    console.log(data.pages);
    fs.writeFile('server/api/pages.json', JSON.stringify(data), 'utf-8', (err, data) =>{
      if(err)
        throw error
      console.log('JSON Updated successfully!');
    })
  });
}

module.exports = {
  pages: pagesRouter
}
