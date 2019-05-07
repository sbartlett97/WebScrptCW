'use strict'
/*
UP777815 Web Script Programming Coursework 2019
*/

//initiate our constants
const express = require('express');
const app = express();
const pages = require('./api/pages');
const favicon = require('serve-favicon');
const updater = require('./api/config');
const imgRouter = require('./api/pictures');
const multer = require('multer');



//setup the static routes etc.
app.use(favicon(__dirname + '/../public/images/favicon.ico'));
app.use('/', express.static('public'));
app.use('/config', express.static('private'));
app.use(express.json());

//set up the routers
app.use(imgRouter.imgRouter);
app.use(pages.pages);
app.use(updater.updater);

//get the app listening on :8080
app.listen(8080);
