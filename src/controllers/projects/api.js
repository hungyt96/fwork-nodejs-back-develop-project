const express = require('express');
const db = require('./services')

const api = express();

api.get('/', db.listProject);
api.get('/:projectID', db.getProjectById);
api.post('/', db.createProject);
api.put('/:projectID', db.editProject);
api.delete('/:projectID', db.deleteProject);

module.exports = api;
