const Feedback = require('./models/feedback');

// Create project
const createFeedback = (req, res) => {
	Feedback.create(req.body).then(function (results) {
		if (results) {
			res.statusCode = 201;
			res.send(results);
		}
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({
				message: "Not_Create"
			})
		}
	});
} //OK

module.exports = {createFeedback};
