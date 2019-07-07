const config = require("./config/config");
const logColor = require("./src/untils/logColor");

const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const routes = require('./src/routes');
app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  if (err) {
    logColor('color:red Invalid Request data!');
    res.statusCode = 400;
    res.send('Invalid Request data')
  } else {
    next();
  }
});

const mongoose = require('./src/untils/db/mongodb');

module.exports = app;