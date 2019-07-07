const mongoose = require('../../src/untils/db/mongodb');
const debug = require('debug')('mongodb:');

debug(`Start Test`);
//Create collection
// var User = mongoose.model('Test module db _ dbname', {name: String, roles: Array, age: Number});
// //Create a new user
// var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});
// //Some modifications in user object
// user1.name = user1.name.toUpperCase();
// debug(user1);
//
// //Lets save it
// user1.save(function (err, userObj) {
//     if (err) {
//         debug(err);
//     } else {
//         debug('saved successfully:', userObj);
//     }
// });
//
// //Lets try to Find a user
// User.findOne({name: 'modulus admin'}, function (err, userObj) {
//     if (err) {
//         debug(err);
//     } else if (userObj) {
//         debug('Found:', userObj);
//
//         //For demo purposes lets update the user on condition.
//         if (userObj.age != 30) {
//             //Some demo manipulation
//             userObj.age += 30;
//
//             //Lets save it
//             userObj.save(function (err) {
//                 if (err) {
//                     debug(err);
//                 } else {
//                     debug('Updated', userObj);
//                 }
//             });
//         }
//     } else {
//         debug('User not found!');
//     }
// });
//
