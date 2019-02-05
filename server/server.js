'use strict'
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const apiV1 = require('./apiV1');
// ... profit?

app.use('/', express.static('public/'));
app.use('/config', express.static('private/'));
app.use(express.json());
app.use(apiV1);

app.listen(8080);
