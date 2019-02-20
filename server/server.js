'use strict'
const express = require('express');
const app = express();
const api = require('./api/api');

// app.use('/', express.static('./webpages/public/'));
app.use('/config', express.static('./webpages/private/'));
app.use(express.json());
app.use(api.router);
app.use(api.dashboard);
app.listen(8080);
