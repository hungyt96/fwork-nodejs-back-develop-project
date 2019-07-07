const mongodb = require('./config_mongo');
const network = require("./config_network");
const jwtConfig = require('./config_jwt');

module.exports = {
    mongodb: mongodb,
    network: network,
    jwtConfig: jwtConfig
}
