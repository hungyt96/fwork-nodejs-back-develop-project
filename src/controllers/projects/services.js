const {Project} = require('./models/project');

// Fetch list project in projects_
const listProject = (req, res) => {
	console.log(Object.keys(req.query))
	if(Object.keys(req.query).length==0){
		Project.find({}, function (err, results) {
			if (err) throw err;
			res.statusCode = 200;
			res.json(results);
		});// Retrieve 5 data
	}
	else{
		Project.find({ is_private: req.query.is_private }).then(function (results) {
		res.send(results);
		}).catch(function (err) {
			if (err) {
				res.json({
					message: "Not_Exists"
				});
			};
		});
	};
};// Ok

// Create project
const createProject = (req, res) => {
	console.log(req.body)
	Project.create(req.body).then(function (results) {
		if (results) {
			res.statusCode = 201;
			res.send(results);
		};
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({
				message: "Not_Create"
			});
		};
	});
}; //OK

// Fetch project by id
const getProjectById = (req, res) => {
	Project.findOne({ _id: req.params.projectID }).then(async function (results) {
		if (results) {
			res.statusCode = 200;
			res.send(results);
		};
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({
				message: "Not_Exists"
			});
		};
	});
}; //OK

// Edit project by id
const editProject = (req, res) => {
	Project.findOneAndUpdate({ _id: req.params.projectID }, req.body).then(function (results) {
		if (results) {
			res.statusCode = 200;
			res.json({
				message: "Updated"
			});
		};
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({
				message: "Not_Update"
			});
		};
	});
}; //OK

// Delete project by id
const deleteProject = (req, res) => {
	Project.findOneAndDelete({ _id: req.params.projectID }).then(function (results) {
		if (results) {
			res.statusCode = 200;
			res.json({
				message: []
			});
		};
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({
				message: "Not_Delete"
			});
		};
	});
}; //OK

module.exports = {
	listProject,
	createProject,
	getProjectById,
	editProject,
	deleteProject
};
