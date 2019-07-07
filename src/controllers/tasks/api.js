const express = require('express');
const db = require('./services')

const api = express();

api.get('/', db.listTask);
api.get('/:taskID', db.getTaskById);
api.post('/', db.createTask);
api.post('/bulk_create', db.createBulkTask);
api.put('/:taskID', db.editTask);
api.delete('/:taskID', db.deleteTask);
 
module.exports = api;