const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    work_id:{
        type:String
    },
    content_type_id:{
        type:String
    },
    user_id:{
        type:String
    },
    create_date:{
        type:Date,
        default: Date.now
    }
})
// console.log(WorkSchema.obj);

const Vote = mongoose.model('Vote', voteSchema);

module.exports.Vote = Vote;
module.exports.voteSchema = voteSchema;