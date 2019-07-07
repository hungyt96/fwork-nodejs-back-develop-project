const express = require('express');
const db = require('./services')

const api = express();

api.post('/', db.createFeedback);

module.exports = api;