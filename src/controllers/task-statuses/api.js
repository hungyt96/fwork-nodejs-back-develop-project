const express = require('express');
const db = require('./services')

const api = express();

api.get('/', db.listStatus);
api.get('/:statusID', db.getStatusById);
api.post('/', db.createStatus);
api.post('/bulk_update_order', db.editBulkOrder)
api.put('/:statusID', db.editStatus);
api.delete('/:statusID', db.deleteStatus);
 
module.exports = api;