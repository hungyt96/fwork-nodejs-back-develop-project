const jwt = require('jsonwebtoken');
const config = require('./../../../config/config');

function get_token_for_user(user, secret, tokenLife) {
    let token = jwt.sign(user, secret, { 
        expiresIn: tokenLife
    });
    return token;
}

function get_user_for_token(token, secretKey) {
    let decoded = jwt.verify(token, secretKey);
    return decoded;
}

module.exports = {
    createToken: get_token_for_user,
    getToken: get_user_for_token
};