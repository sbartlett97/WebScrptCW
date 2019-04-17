'use strict'

const config = require('../config');
const client = require('mariasql');

const c = new client({
  host: 'localhost',
  user: config.mysql.user,
  password: config.mysql.password
});
const dbsetup = ['DROP DATABASE IF EXISTS up777815CW;',
                'CREATE DATABASE up777815CW DEFAULT CHARACTER SET "utf8mb4";',
                'USE up777815CW;',
                'CREATE TABLE pages (id INTEGER PRIMARY KEY AUTO_INCREMENT,name VARCHAR(20) NOT NULL,type VARCHAR(20) NOT NULL);',
                'CREATE TABLE content (id INTEGER PRIMARY KEY AUTO_INCREMENT,pageId INTEGER REFERENCES pages(id),value VARCHAR(50));',
                'CREATE TABLE styles (id INTEGER PRIMARY KEY AUTO_INCREMENT,pageId INTEGER REFERENCES pages(id),element VARCHAR(20),property VARCHAR(20),value VARCHAR(20));',
                'INSERT INTO pages(name, type) VALUES ("do not disturb", "text");',
                'INSERT INTO pages(name, type) VALUES ("come in", "text");',
                'INSERT INTO pages(name, type) VALUES ("brb", "text");',
                'INSERT INTO pages(name, type) VALUES ("prosper", "quote");',
                'INSERT INTO content(pageId, value) VALUES (1, "DO NOT DISTURB!");',
                'INSERT INTO content(pageId, value) VALUES (2, "Come in! 😃");',
                'INSERT INTO content(pageId, value) VALUES (3, "Be right back! 🏃🏻‍♂️");',
                'INSERT INTO content(pageId, value) VALUES (4, "Live long and prosper 🖖🏻 - Commander Spock");',
                'INSERT INTO styles(pageId, element, property, value) VALUES (1, "body", "background-color", "red");',
                'INSERT INTO styles(pageId, element, property, value) VALUES (2, "body", "background-color", "green");',
                'INSERT INTO styles(pageId, element, property, value) VALUES (2, "body", "color", "white");',
                'INSERT INTO styles(pageId, element, property, value) VALUES (3, "body", "background-color", "cyan");',
                'INSERT INTO styles(pageId, element, property, value) VALUES (4, "body", "background-color", "#4796F3");'
              ]
dbsetup.forEach(function(item){
  c.query(item, function(err, rows){
    if (err)
      throw err;
    console.log(rows);
  });
});

c.end();
