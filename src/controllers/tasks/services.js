const {Task} = require('./models/task');
const {Work} = require('../works/models/work');
const {Project} = require('../projects/models/project');
const {Status} = require('../task-statuses/models/status');

const listTask = async (req, res) => {
    try{
        if(Object.keys(req.query).length === 0){
            let tasks = await Task.find().lean();
            let works = await Work.find().select({name: 1});
            let projects = await Project.find().select({name: 1});
            let statuses = await Status.find().select({name: 1, color: 1, is_close: 1});
            tasks.forEach(t => {
                let work = works.find(c => parseInt(c._id) === parseInt(t.work_id));
                let project = projects.find(c => parseInt(c.id) === parseInt(t.work_id));
                let status = statuses.find(c => parseInt(c.id) === parseInt(t.status_id));
                t.status = status; 
                t.work = work;
                t.project = project;
                console.log(project);
            });
            res.status(200).json(tasks);

        } else {
            let result;
            if(Object.keys(req.query)[0] === 'project') result = await Task.find({project_id: req.query.project});
            if(Object.keys(req.query)[0] === 'status') result = await Task.find({status_id: req.query.status});
            if(Object.keys(req.query)[0] === 'work') result = await Task.find({work_id: req.query.work});
            if(Object.keys(req.query)[0] === 'exclude_status') result = await Task.find({status_id: {$ne: req.query.exclude_status}}) 
            res.status(200).json(result);
        }
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getTaskById = async (req, res) => {
    try{
        const task = await Task.findById(req.params.taskID).lean();
        if (!task) return res.status(400).send('Invalid Task ID');

        let work = await Work.findById(task.work_id).select({_id: 1, name: 1});
        let project = await Project.findById(task.project_id).select({_id: 1, name: 1});
        let status = await Status.findById(task.status_id).select({name: 1, color: 1, is_close: 1});

        task.work = work;
        task.project = project;
        task.status = status;
        res.status(200).json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createTask = async (req, res) => {
    try{
        let work = await Work.findById(req.body.work_id);
        if (!work) return res.status(404).send('Invalid Work ID');

        if (!req.body.status_id){
            id = await Status.findOne({project_id: work.project_id}).sort({order: 1});
            req.body.status_id = id;
        };
        let project = await Project.findById(work.project_id);
        req.body.project_id = project._id;
        let task = await Task.create(req.body);
        work.tasks.push(task);
        work = await work.save();
        project.works.forEach(w => {
            if (w.id === work.id) w.tasks.push(task);
        }); 
        project = await project.save();
        res.status(201).json(task);
    } catch (err){
        res.status(400).send(err.message);
    }
}

const editTask = async (req, res) => {
    try{
        let task = await Task.findByIdAndUpdate(req.params.taskID, req.body, {new: true});
        if (!task) return res.status(400).send('Invalid Task Id');

        let work = await Work.findById(task.work_id);
        let project = await Project.findById(work.project_id);
        let old_task = work.tasks.find(c => c.id === task.id);
        let old_work = project.works.find(c => c.id === task.id);
        let p = work.tasks.indexOf(old_task);
        work.tasks.splice(p, 1);
        work.tasks.splice(p, 0, task);
        work = await work.save();
        p = project.works.indexOf(old_work);
        project.works.splice(p, 1);
        project.works.splice(p, 0, work);
        await project.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const deleteTask = async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.taskID);
        let work = await Work.findById(task.work_id);
        let project = await Project.findById(work.project_id);
        work.tasks.pull({_id: task._id});
        work = await work.save();
        project.works.pull({_id: work._id});
        await project.save();
        res.status(204).json({});
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const createBulkTask = async (req, res) =>{
    try {
        let work = await Work.findById(req.body.work_id);
        let bulk = req.body.bulk_tasks;
        bulk.forEach(async b => {
            let task = {
                name: b,
                project_id: work.project_id,
                work_id : req.body.work_id
            }
            console.log(task);
            await Task.create(task);
        })
        res.status(200).send('done');
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}

module.exports = {
  listTask,
  createTask,
  getTaskById,
  editTask,
  deleteTask,
  createBulkTask
}
