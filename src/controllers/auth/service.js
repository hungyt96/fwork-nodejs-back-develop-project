/**
 * Module auth
 * Create: by @Hunglt
 * Version: 1.0.1
 */
const User = require('../users/models/user');
const config = require('./../../../config/config');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendEmail');
const debug = require('debug')('auth:')

// auth Register
async function register(req, res) {
    debug(req)
    const { email, full_name, password} = req.body;
    try {
        if(email && full_name && password) {
            let newUser = new User({
                email: email,
                full_name: full_name,
                password: password
            });

            const emailToken = await jwt.sign({ email:email }, config.jwtConfig.email_secret, {
                expiresIn: config.jwtConfig.emailTokenLife
            });
            const url = `http://localhost:${config.network.port}/api/v1/auth/confirmation/${emailToken}`;
            const mailOptions = {
                from: 'testsmtpmail.h1@gmail.com',
                to: email,
                subject: 'Confirm Email',
                html: `<h1>Please click this to confirm your email:</h1> <a href="${url}"><i>Click me</i></a>`,
            };
            
            await sendMail(mailOptions, (err, result) => {
                if(err) throw err;
            })

            newUser.save((err) => {
                if (err) {
                    res.json({ 
                        _error_message: "Username is already in use.",
                        _error_type: "tinasoft.exceptions.WrongArguments"
                     });
                } else {
                    res.status(201).json({ success: true, msg:'Successful created new user' });
                }
            });
        }
    } catch(e) {
        res.status(400).json({
            _error_message: "Something wrong",
            _error_type: "tinasoft.exceptions.WrongArguments"
        })
    }
}

// auth Login
function login (req, res) {
    const { email, password } = req.body;
    User.findOne({'email': email}, (err, user) => {
        if(err) throw err;
        if(!user) {
            res.status(401).send({
                success: false, 
                msg: 'Authentication failed. User not found.'
            });
        } else {
            user.comparePassword(password, (err, isMatch) => {
                if(isMatch && !err) {
                    // Update login time
                    User.updateOne({email: user.email}, { last_login: Date.now() }, (err) => {
                        if(err) throw err;
                    });
                    // Create token
                    const auth_token = jwt.sign({email: user.email}, config.jwtConfig.secret, {
                        expiresIn: config.jwtConfig.tokenLife
                    });
                    user.password = null;
                    let userInfor = Object.assign(user.toJSON(),{ auth_token });
                    res.status(200).json(userInfor);
                } else {
                    res.status(401).send({
                        _error_message: "Wrong email or password.",
                        _error_type: "tinasoft.exceptions.WrongArguments"
                    });
                }
            });
        }
    });
}

// auth Email
async function authEmailToken(req, res, next) {
    try {
        const user = await jwt.verify(req.params.confirm_token, config.jwtConfig.email_secret);
        if(user){
            await User.updateOne({ email: user.email }, { is_active: true });
        } 
        next();
    } catch (err) {
        throw err;    
    }
    
    next();
}

module.exports = {
    register, 
    login, authEmailToken
};