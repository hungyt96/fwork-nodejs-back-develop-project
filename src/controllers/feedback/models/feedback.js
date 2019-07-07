const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
	email:{
		type: String,
		required: [true, 'Email field is required'],
	},
	comment:{
		type: String,
		required: [true, 'Comment field is required']
	},
	created_date:{
		type: Date,
		default: Date.now
	}
});
const Feedback = mongoose.model('feedbacks',feedbackSchema);
module.exports = Feedback;