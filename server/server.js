'use strict'
const express = require('express');
const app = express();
const api = require('./api/dashboard');
const favicon = require('serve-favicon');
const settings = require('./api/settings');
app.use(favicon(__dirname + '/../public/images/favicon.ico'));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use('/config', express.static('private'));
app.use(express.json());
app.use(api.router);
app.use(settings.settings);
app.use(api.dashboard);
app.listen(8080);
