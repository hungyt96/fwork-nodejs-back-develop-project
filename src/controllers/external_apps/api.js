const express = require('express');

const api = express();

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

module.exports = api;