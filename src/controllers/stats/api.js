const express = require('express');
const db = require('./services')
const api = express();

api.get('/discover', db.discover);
api.get('/system', db.system);
module.exports = api;
