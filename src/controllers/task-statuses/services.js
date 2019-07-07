const {Status} = require('./models/status');

const listStatus = async (req, res) => {
    try{
        if(Object.keys(req.query).length === 0){
            let statuses = await Status.find().lean();
            res.status(200).json(statuses);
        } else {
            let result;
            if(Object.keys(req.query)[0] === 'project') result = await Status.find({project_id: req.query.project});
            res.status(200).json(result);
        }
    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getStatusById = async (req, res) => {
    try{
        const status = await Status.findById(req.params.statusID).lean();
        if (!status) return res.status(400).send('Invalid Status ID');
        res.status(200).json(status);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createStatus = async (req, res) => {
    try{
        let orders = await Status.findOne().sort({order: -1});
        console.log(orders);  
        if (!orders) req.body.order = 1;
        if (req.body.order == undefined) req.body.order = orders.order + 1; 
        let status = await Status.create(req.body);
        res.status(201).json(status);
    } catch (err){
        console.log(err);
        res.status(400).json(err.message);
    } 
}  
 
// color: in hexadecimal                [x]
// is_closed: (true|false)              [x]
// name (required)                      [x]         
// order: integer                       [x]
// project: (required): project id      [x]

const editStatus = async (req, res) => {
    try{
        let status = await Status.findByIdAndUpdate(req.params.statusID, req.body, {new: true});
        if (!status) return res.status(400).send('Invalid Status Id');
        res.status(200).json(status);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const deleteStatus = async (req, res) => {
    await Status.findByIdAndDelete(req.params.statusID);
    res.status(204).json({});
}

const editBulkOrder = async (req, res) => {
    try{
        let statuses = [];
        let bulk = req.body.bulk_task_statuses;
        bulk.forEach(async b => {
            let stt = {
                order: b[1],
                project_id: req.body.project
            }
            await Status.findByIdAndUpdate(b[0], stt, { new: true }); 
        });
        res.status(200).send('Done');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// project (required)
// bulk_task_statuses: list where each element is a list, 
// the first element is the status id and the second the new order

module.exports = {
  listStatus,
  createStatus,
  getStatusById,
  editStatus,
  deleteStatus,
  editBulkOrder
}
