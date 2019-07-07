const mongoose = require('mongoose');
const {Project} = require('../../projects/models/project');

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    slug: {
        type: String,
    },
    color: {
        type: String,
        default: '#999999'
    },
    order: {
        type: Number,
    },
    is_closed: {
        type: Boolean,
        default: false
    }
});

const Status = mongoose.model('task-statuses', statusSchema);
module.exports.Status = Status;

