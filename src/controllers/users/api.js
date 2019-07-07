const express = require('express');

const api = express();

const userService = require('./service');

api.get('/', function (req, res) {
    res.statusCode = 200;
    res.json({
        "method": "get",
        "status": "success",
        "path": require('path').dirname(__filename)
    });
});

api.post('/', function (req, res) {
    res.statusCode = 200;
    res.json({
        "method": "post",
        "status": "success",
        "path": require('path').dirname(__filename)
    });
});

api.post('/password_recovery', userService.passwordRecovery);

api.post('/change_password_from_recovery', userService.changePwFromRecovery);

module.exports = api;