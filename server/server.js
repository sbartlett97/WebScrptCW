'use strict'
const express = require('express');
const app = express();
<<<<<<< HEAD
const api = require('./api/api');
=======
const apiV1 = require('./api/api');
// ... profit?
>>>>>>> e4aa3ddbdc5d8f8dcd5d1642ce14d9e2b5f083dd

// app.use('/', express.static('./webpages/public/'));
app.use('/config', express.static('./webpages/private/'));
app.use(express.json());
app.use(api.router);
app.use(api.dashboard);
app.listen(8080);
