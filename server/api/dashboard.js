'use strict'

const express = require('express');
const router = express.Router();
const dashboard = express.Router();
const ejs = require('ejs');
const pages = __dirname + '/../../public/templates/';
const config = require('../../config');
const db = require('mariasql');
router.post('/update', updateDisplay);
router.get('/checkUpdate', checkUpdate);
const defaultPage = 'come in';
let destPage;


dashboard.get('/', function(req, res){
  loadPage(defaultPage, res);
});

async function updateDisplay(req, res){
  console.log('update recieved');
  destPage = req.body.target;
  console.log(destPage);
  res.send('update completed');
}

async function checkUpdate(req, res){
    res.send(destPage);
}


dashboard.get('/:page', function(req, res){
  loadPage(req.params.page, res);
});

async function loadPage(page, res){
  const con = new db(config.mysql);
  con.query(`SELECT id, type FROM pages WHERE name = '${page}'`,null, {useArray: true}, function(err, row){
    if (err)
      throw err
    let page = row[0]
    let id = page[0];
    let type = page[1];
    if(type == "picture"){

    }else{
      con.query(`SELECT value FROM content WHERE pageId = ${id}`, null, {useArray: true}, function(err, row){
        if (err)
          throw err
        let textArr = row[0];
        let by = "";
        let text;
        if(type == "quote"){
          let texts = textArr[0].split("-");
          console.log(texts);
          text = texts[0];
          by = by.concat("- ", texts[1]);
        }else{
          text = textArr[0];
        }
        con.query(`SELECT element, property, value FROM styles WHERE pageId = ${id}`, {useArray : true}, function(err, rows){
          if (err)
            throw err
          let styleObjetcs = rows.slice(0, rows.length);
          let styleString = "";
          styleObjetcs.forEach(function(item){
            styleString = styleString.concat(item.element,"{ ", item.property, ": ", item.value, ";}");
          })
          ejs.renderFile(`${pages}/${type}.ejs`, {title: destPage, by: by, text: text, source: undefined, styling: styleString}, function(err, str){
            if (err)
              throw err
            res.set('Content-Type','text/html').send(str);
          });
        });
    });
  }
});
  con.end();
}

module.exports = {
  router: router,
  dashboard: dashboard
};
