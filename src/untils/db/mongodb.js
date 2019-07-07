const config = require('../../../config/config');
const debug = require('debug')('mongodb:');
const colors = require('colors');
const logColor = require("../logColor");

debug(`Start connect to mongodb: ${config.mongodb.url}`);
const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    keepAlive: true,
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 50, // Maintain up to 10 socket connections

    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(config.mongodb.url, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => {
        logColor(`color:green MongoDB ready to use`);
    },
    /** handle initial connection error */
    err => {
        console.error( Error(` Unable to connect to database \n${err}`) );
    }
);

module.exports = mongoose;

