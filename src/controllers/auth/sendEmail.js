const nodemailer = require('nodemailer');
const config = require('./../../../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testsmtpmail.h1@gmail.com',
        pass: 'gqtngdjxooiyvgmt'
    }
});

function sendMail(mailOptions, cb) {
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

module.exports = sendMail;
