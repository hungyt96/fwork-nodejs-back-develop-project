const express = require('express');
const db = require('./services')

const api = express();

api.get('/', db.listWork);
api.get('/:workID', db.getWorkById);
api.post('/', db.createWork);
api.patch('/:workID', db.editWork);
api.delete('/:workID', db.deleteWork);
api.put('/addmember/:memberID', db.addMember);
api.delete('/removemember/:memberID', db.removeMember);


// api.post('/:workID/upvote', db.upVote);
// api.delete('/:workID/downvote', db.downVote);
// api.get('/:workID/voters', db.voters);
// api.post('/:workID/watch', db.watch);
// api.post('/:workID/unwatch', db.unWatch);
// api.get('/attachments', db.attachments);



module.exports = api;