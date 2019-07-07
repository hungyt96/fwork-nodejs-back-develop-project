const express = require('express');
const api = express();
const protectRoute = require('../../untils/protectRoute');
const authService = require('./service');

api.get('/', protectRoute.authenticate('jwt', { session: false }), (req, res) => {
    // res.send('ok');
});

api.get('/confirmation/:confirm_token', authService.authEmailToken, (req, res) => {
    res.send('mail confirm');
});

api.post('/register', authService.register);

api.post('/', authService.login);

module.exports = api;