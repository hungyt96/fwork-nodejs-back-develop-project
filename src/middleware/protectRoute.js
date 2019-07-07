const passport = require('passport');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const config = require('./../../config/config');

let opts = {}

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user) {
        if(err) {
            return done(err, false);
        }
        if(user) {
            return done(null, user);
        } else {
            done(null, false);
        }
    })
}));

