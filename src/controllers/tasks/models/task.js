const mongoose = require('mongoose');
const {Work} = require('../../works/models/work');
const {Project} = require('../../projects/models/project');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    work_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Work',
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        // required: true
    },
    date_created: {
        type: Date,
        default: Date.now(),
    },
    last_modified: {
        type: Date,
        default: Date.now(),
    },
    date_finished: {
        type: Date,
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports.Task = Task;
module.exports.taskSchema = taskSchema;
