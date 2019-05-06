'use strict'
/*
UP777815 Web Script Programming Coursework 2019
*/


const express = require('express');
const app = express();
const pages = require('./api/pages');
const favicon = require('serve-favicon');
const updater = require('./api/config');
app.use(favicon(__dirname + '/../public/images/favicon.ico'));
app.use('/', express.static('public'));
app.use('/config', express.static('private'));
app.use(express.json());
app.use(pages.pages);
app.use(updater.updater);
app.listen(8080);
