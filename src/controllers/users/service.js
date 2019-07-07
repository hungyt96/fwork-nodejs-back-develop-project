const jwt = require('jsonwebtoken');
const User = require('./models/user');
const config = require('../../../config/config');
const sendMail = require('../auth/sendEmail');

function passwordRecovery(req, res) {
    try {
        let { email } = req.body;

        User.findOne({'email':email}, async(err, user) => {
            if(err) throw err;

            if(user !== null && email) {
                const recoverToken = await jwt.sign({ email:email }, config.jwtConfig.email_secret, {
                    expiresIn: config.jwtConfig.emailTokenLife
                });
                const url = `http://localhost:${config.network.port}/api/v1/auth/password_recovery/${recoverToken}`;
                const mailOptions = {
                    from: 'testsmtpmail.h1@gmail.com',
                    to: email,
                    subject: 'Confirm Email',
                    html: `<h1>Click this link to recover ur password:</h1> <a href="${url}"><i>Click me</i></a>`,
                };

                await User.updateOne({email:email}, {token: recoverToken});

                sendMail(mailOptions, (err, data) => {
                    if(data && !err) {
                        return res.status(200).json({detail: "Mail sended successful!"});
                    }
                })
            } else {
                return res.status(400).json({
                    _error_message: 'Username or password does not matches user',
                    _error_type: 'tinasoft.exceptions.WrongArguments'})
            }
        })
        
    } catch (e) {
        return res.status(400).json({
            _error_message: e.name,
            rror_type: 'tinasoft.base.exceptions.WrongArguments'
        })
    }
}

/**
 *
 * @param req
 * @param res
 * @returns +
*           -
 */
function change_password_from_recovery(req, res) {
    let { password, password2, token } = req.body;
    try {
        if(password && password2 && token && password === password2) {
            jwt.verify(token, config.jwtConfig.email_secret, (err, decode) => {
                if (err) throw err;
                User.findOne({email:decode.email}, (err, user) => {
                    if (err) throw err;
                    if(token && user.token !== null && user.token === token) {
                        user.password = password;
                        user.token = undefined;
                        // Save
                        user.save((err) => {
                            if(err) {
                                throw err;
                            } else {
                                return res.status(204).send();
                            }
                        })
                    } else {
                        throw new Error()
                    }
                })
            });
        } else {
            return res.json({
                _error_message: "Something missing",
                _error_type: "tinasoft.exceptions.WrongArguments"
            });
        }
    } catch (e) {
        res.json({
            _error_message: e.name,
            _error_type: "tinasoft.exceptions.WrongArguments"
        });
    }
}

module.exports = {
    passwordRecovery,
    changePwFromRecovery: change_password_from_recovery
}