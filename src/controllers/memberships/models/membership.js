const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
	is_admin:{
		type: Boolean,
		default: false
	},
	email:{
		type: String,
		required: [true, 'Email field is required']
	},
	user_id:{
		type: String
	},
	project_id:{
		type: String,
		required: [true, 'Project ID field is required']
	},
	role_id: {
		type: String
		// required: [true, 'Role ID field is required']
	},
    invited_by_id:{
    	type: String
    }
});
const Membership = mongoose.model('memberships',membershipSchema);
module.exports.Membership = Membership;
module.exports.membershipSchema = membershipSchema;