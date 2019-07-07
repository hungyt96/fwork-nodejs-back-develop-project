const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {membershipSchema} = require('../../memberships/models/membership')
const {workSchema} = require('../../works/models/work')

const projectSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name field is required'],
	},
	description:{
		type: String,
		required: [true, 'Description field is required']
	},
	owner:{
		type: String,
		required: [true, 'Owner field is required']
	},
	is_private:{
		type: Boolean,
		required: [true, 'Chose private or public']
	},
	members:{
		type: [membershipSchema]
	},
	works:{
		type: [workSchema]
	},
	cost: String,
    revenue: String,
	created_date:{
		type: Date,
		default: Date.now
	},
	start_date:{
		type: Date
	},
	finish_date:{
		type: Date
	}
});
const Project = mongoose.model('projects',projectSchema);
module.exports.Project = Project;