const { Work } = require('../works/models/work');
const {Project} = require('../projects/models/project')
const { Vote } = require('./models/vote');
const { Membership } = require('../memberships/models/membership');

const listWork = (req, res) => {
	if (Object.keys(req.query).length == 0) {
		Work.find({}, function (err, results) {
			if (err) throw err;
			res.statusCode = 200;
			res.json(results);
		});
	}
	else {
		Work.find({ project_id: req.query.project }).then(function (results) {
			res.send(results);
		}).catch(function (err) {
			if (err) {
				res.statusCode = 404;
				res.json({
					message: "Not_Exists"
				})
			}
		});
	}
}// OK


const createWork = async (req, res) => {
	try {
		const project = await Project.findById(req.body.project_id);
		let work = await Work.create(req.body);
		project.works.push(work)
		await project.save();
		res.statusCode = 200;
		res.json({
			message: 'Created'
		});
	} catch (err) {
		res.statusCode = 404;
		res.json({
			message: 'Not_Created'
		})
	}
} //OK

const getWorkById = async (req, res) => {
	try {
		let work = await Work.findOne({ _id: req.params.workID });
		res.statusCode = 200;
		res.json(work);
	} catch (err) {
		res.statusCode = 404;
		res.json({
			message: 'Not_get'
		})

	}
}// OK

const editWork = async (req, res) => {
	try {
		let edit = await Work.findOneAndUpdate({ _id: req.params.workID }, req.body, {new:true});
		let project = await Project.findById(edit.project_id);
		project.works.pull({_id: req.params.workID})
		await project.save();
		project.works.push(edit)
		await project.save();
		res.statusCode = 200;
		res.json({
			message: 'Edited'
		})

	} catch (err) {
		console.log(err + '');
		res.statusCode = 404;
		res.json({
			message: 'Not_Edit'
		})

	}
}//OK
const deleteWork = async (req, res) => {
	try {
		let work = await Work.findOneAndDelete({ _id: req.params.workID })
		const project = await Project.findById(work.project_id);
		project.works.pull({_id: req.params.workID});
		await project.save()
		res.statusCode = 200;
		res.json({
			message: 'Deleted'
		})
	} catch (err) {
		res.statusCode = 404;
		res.json({
			message: 'Not_Delete'
		})

	}
}//OK


//upVote
const upVote = async (req, res) => {
	let vote = {
		work_id: req.body.params
	}
	try {
		let a = await Vote.create(vote);
		res.statusCode = 200;
		res.json({
			message: "Voted"
		})
	} catch (error) {
		res.statusCode = 404;
		res.json({
			message: 'Not_Vote'
		})
	}
}
//downVote

const downVote = async (req, res) => {
	try {

		await Work.findOneAndDelete({ work_id: req.body.params })
		res.statusCode = 200;
		res.json({
			message: "Remove_vote"
		})
	} catch (error) {
		res.statusCode = 404;
	}
}
//Get user story voters list
const voters = async (req, res) => {

}
//Watch a user story




const watch = async (req, res) => {

}
//Stop watching a user story

const unWatch = async (req, res) => {

}

// List user story watchers
//
// const voters = async (req, res)=>{

// }

// List attachments
const attachments = async (req, res) => {
	try {
		let project = await Work.find({ project_id: req.query.project, _id: req.query.object_id })
		res.statusCode = 200;
		res.json(project);
	} catch (err) {
		res.statusCode = 400;
		res.json({
			message: 'Not_get'
		})

	}
}

//Create attachment tep dinh kem 


const addMember = async (req, res) => {
	try {
		let membership = await Membership.findOne({ _id: req.params.memberID });
		let work_mem = await Work.findById(req.body.work_id);

		work_mem.members.push(membership._id);
		await work_mem.save();
		res.json({
			message: "Added"
		})
	} catch (error) {
		res.json({
			message: "Not_Add"
		})
	}
}

//remove member
const removeMember = async (req, res) => {
	try {
		let work_mem = await Work.findById(req.body.work_id);
		work_mem.members.forEach(element => {
			if (element == req.params.memberID) {
				work_mem.members.pull(element);
			}
		});
		await work_mem.save();
		res.json({
			message: "remove"
		})
	} catch (error) {
		res.json({
			message: "Not_Rm"
		})
	}
}
module.exports = {
	listWork,
	createWork,
	getWorkById,
	editWork,
	deleteWork,
	upVote,
	downVote,
	voters,
	watch,
	unWatch,
	attachments,
	addMember,
	removeMember
}