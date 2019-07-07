const express = require('express');

const api = express();

// Begin code here
const config = require('../../config/config');
const controller_folder = './src/controllers';
const fs = require('fs');

const UserModel = require("../models/ExampleSchema");

var user = new UserModel({
    password: "test1",
    email: "test2"
});


let list_api = {};

fs.readdir(controller_folder, (err, files) => {
    files.forEach(file => {
        list_api[file] = `http://${config.network.hostname}:${config.network.port}/api/v1/${file}`;
    });
});

api.get('/', function (req, res) {
    var result = user.save();
    console.log(result)

    res.statusCode = 200;
    res.json(list_api);
});

api.post('/', function (req, res) {
    res.statusCode = 200;
    res.json({
        "method": "post",
        "status": "success",
        "path": require('path').dirname(__filename)
    });
});

// End code here

module.exports = api;