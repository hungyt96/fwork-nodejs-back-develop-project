const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const config = require('../../config/config');
const User = require('../controllers/users/models/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtConfig.secret
}

passport.use(new JwtStrategy( opts, async (payload, done) => {
    try {
        const user = await User.findOne({ email: payload.email });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));

module.exports = passport;
