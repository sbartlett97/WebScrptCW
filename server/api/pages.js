'use strict'
/*
UP777815 Web Script Coursework 2019
*/

const express = require('express');
const fs = require('fs');
const pagesRouter = express.Router();

pagesRouter.get('/getJSON', sendJSON);
pagesRouter.post('/updateJSON', addTextPage);
pagesRouter.delete('/deletePage', deletePage);

async function sendJSON(req, res){
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if (err)
      throw err;
    let json = JSON.parse(data);
    json = json.pages;
    res.json(json);
  });
}

async function addTextPage(req, res){
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if (err)
      throw err;
    data = JSON.parse(data);
    let jsonArr = data.pages;
    const extraJSON = req.body;
    jsonArr.push(extraJSON);
    data.pages = jsonArr;
    fs.writeFile('server/api/pages.json', JSON.stringify(data), 'utf-8', (err, data) =>{
      if(err)
        throw err
      console.log('JSON Updated successfully!');
    });
  });
  res.send();
}

async function deletePage(req, res){
  const toDelete = req.body.target;
  fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
    if(err)
      throw err
    data = JSON.parse(data);
    let pages = data.pages;
    let index = pages.findIndex((item)=>{
      if(item.title == toDelete){
        return item;
      }
    });
    pages.splice(index, 1);
    data.pages = pages;
    fs.writeFile('server/api/pages.json', JSON.stringify(data), 'utf-8', (err, data) =>{
      if(err)
        throw err
    });
  });
  res.send();
}


module.exports = {
  pages: pagesRouter
}
