const express = require('express');
const db = require('./services')

const api = express();

api.get('/', db.listMemberships);
api.get('/:membershipID', db.getMembershipById);
api.post('/', db.createMembership);
api.post('/bulk_create', db.bulkCreation);
api.put('/:membershipID', db.editMembership);
api.delete('/:membershipID', db.deleteMembership);

module.exports = api;