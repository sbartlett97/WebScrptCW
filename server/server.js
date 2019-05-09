'use strict'
/*
UP777815 Web Script Programming Coursework 2019
*/

//initiate our constants
const express = require('express');
const app = express();
const pageRouters = require('./api/pages');
const favicon = require('serve-favicon');
const updater = require('./api/config');
const imgRouter = pageRouters.imgRouter;
const pages = pageRouters.pages;
const multer = require('multer');




//setup the static routes etc.
app.use(favicon(__dirname + '/../public/images/favicon.ico'));
app.use('/', express.static('public'));
app.use('/config', express.static('private'));
app.use(express.json());

//set up the routers
app.use(imgRouter);
app.use(pages);
app.use(updater.updater);

//get the app listening on :8080
app.listen(8080);
