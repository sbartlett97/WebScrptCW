'use strict'
const ejs = require('ejs');
const db = require('mariasql');
const config = require('../../config');
const pages = __dirname + '/../../public/templates/';

module.exports.renderTemplate = async function renderTemplate(req, res){
  const type = req.params.type;
  const name = req.params.name;
  let text = req.params.msg;
  const bg = req.params.bg;
  const col = req.params.col;
  let by = "";
  if (type == "quote"){
    let texts = text.split('-');
    text = texts[0];
    by = by.concat("- ", texts[1]);
  }
  let styleString = "".concat("body{ ", "background-color: ", bg, "; color: ", col, ";}" );
  const html = ejs.renderFile(`${pages}/${type}.ejs`, {title: "", source: "builder", by: by, text: text, styling: styleString}, function(err, str){
    if (err)
      throw err
    res.set('Content-Type','text/html').send(str);
  });
}

module.exports.addToDB = async function(req, res){
  const con = new db(config.mysql);
  const type = req.params.type;
  const name = req.params.name;
  const text = req.params.msg;
  const bg = req.params.bg;
  const col = req.params.col;
  con.query(`INSERT INTO pages(name, type) VALUES('${name}', '${type}')`, function(err, rows){
    if (err)
      throw err;
  });
  con.query(`SELECT id FROM pages WHERE name = '${name}'`, null, {useArray: true}, function(err, rows){
    if (err)
      throw err;
    let id = rows[0][0];
    con.query(`INSERT INTO content(pageId, value) VALUES(${id}, '${text}')`, function(err, rows){
      if (err)
        throw err;
    });
    con.query(`INSERT INTO styles(pageId, element, property, value) VALUES(${id}, 'body', 'background-color', '${bg}')`, function(err, rows){
      if (err)
        throw err;
    });
    con.query(`INSERT INTO styles(pageId, element, property, value) VALUES(${id}, 'body', 'color', '${col}')`, function(err, rows){
      if (err)
        throw err;
    });
  });
  console.log('new page added!');
  con.end();
  res.send();
}
