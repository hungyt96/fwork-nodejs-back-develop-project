const mongoose = require('mongoose');
const {taskSchema} = require('../../tasks/models/task');

const Schema = mongoose.Schema;

const workSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    status:{
        type:String,
    },
    description:{
        type:String
    },
    tags:[],
    watchers:String,
    assigned_to:{
        type:String,
    },
    members_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'memberships',
      required: true
    },
    budget:String,
    tasks: {
        type: [taskSchema]
    },
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    }
})
// console.log(WorkSchema.obj);

const Work = mongoose.model('Work', workSchema);

module.exports.Work = Work;
module.exports.workSchema = workSchema;
