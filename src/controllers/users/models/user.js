const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    full_name: {
        type:String,
        required:true,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required:true
    },
    token: {
        type: String,
        default: null
    },
    type: {
        type:String,
        default: 'public'
    },
    is_active: {
        type: Boolean,
        default: false
    },
    lang: {
        type:String,
        enum: ['en', 'vi'],
        default: 'en'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    }
});

// Generate hash
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const user = this;
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
});

// Compare password
UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const User = mongoose.model("users_user", UserSchema);

module.exports = User;