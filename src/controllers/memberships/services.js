const {Membership} = require('./models/membership');
const {Project} = require('../projects/models/project')
// Fetch list project in projects_
const listMemberships = (req, res) => {
	if(Object.keys(req.query).length==0){
		Membership.find({}, function (err, results) {
			if (err){
				res.statusCode = 500;
				res.json({message: "Not_Exists"})
			}
			res.statusCode = 200;
			res.json(results);
		});
	}
	if(Object.keys(req.query)[0]=='project'){
		Membership.find({ project_id: req.query.project }, function (err,results) {
			if (err){
				res.statusCode = 500;
				res.json({message: "Not_Exists"})
			}
			res.statusCode = 200;
			res.json(results);
		});
	}
}

// Create membership
const createMembership = (req, res) => {
	Membership.create(req.body).then(async function (results) {
		const project = await Project.findById(req.body.project_id);
		project.members.push(results);
		await project.save();
		res.statusCode = 201;
		res.json({message: 'Created'})
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({message: "Not_Create"})
		}
	});
}//OK

// Fetch membership by id
const getMembershipById = (req, res) => {
	Membership.findOne({ _id: req.params.membershipID }, function (err, results) {
		if (err) {
			res.statusCode = 500;
			res.json({message: "Not_Exists"})
		}
		res.statusCode = 200;
		res.send(results);
	})
}// OK

// Edit membership by id
const editMembership = (req, res) => {
	Membership.findOneAndUpdate({ _id: req.params.membershipID }, req.body, {new:true}).then(async function (results) {
		if (results) {
			console.log(results)
			const project = await Project.findById(results.project_id);
			project.members.pull({_id: req.params.membershipID})
			project.members.push(results)
			await project.save()
			res.statusCode = 200;
			res.json({message: "Updated"})
		}
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({message: "Not_Update"})
		}
	});
}// OK
// Delete member by id
const deleteMembership = (req, res) => {
	Membership.findOneAndDelete({ _id: req.params.membershipID }).then(async function (results) {
		if (results) {
			const project = await Project.findById(results.project_id);
			project.members.pull({_id: req.params.membershipID})
			await project.save()
			res.statusCode = 200;
			res.json({message: []})
		}
	}).catch(function (err) {
		if (err) {
			res.statusCode = 500;
			res.json({message: "Not_Delete"})
		}
	});
}// OK

const bulkCreation = async (req, res) =>{
	let bulk = req.body.bulk_memberships;
	bulk.forEach(b => {
		let mem = {
			email : b.email,
			role_id : b.role_id,
			project_id : req.body.project_id
		}
		Membership.create(mem).then(async function (results) {
			const project = await Project.findById(req.body.project_id);
			project.members.push(results);
			await project.save();
		})
	})
	res.statusCode = 200;
	res.json({
		message: 'Created'
	})
}
module.exports = {
	listMemberships,
	createMembership,
	getMembershipById,
	editMembership,
	deleteMembership,
	bulkCreation
}