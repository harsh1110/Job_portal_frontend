const Job = require('../Models/jobModel')


exports.CreateNewJob = async (req, res) => {
    try {
        console.log(req.body);
        const { designation, position, limit, jobDescription, userId } = req.body
        var createJob = await Job.create({
            designation: designation,
            jobDescription: jobDescription,
            positions: position,
            limit: limit,
            appliedBy: 0,
            createdBy: userId
        })
        createJob.save()
        if (createJob) res.json({ success: "Job added Successfully", data: createJob })
    }
    catch {
        res.json({ error: "Job creation fail" })
    }
}


exports.allJob = async (req, res) => {
    var allJobs = await Job.find({}).lean()
    res.send(allJobs)
}



exports.OneJob = async (req, res) => {
    var id = req.params.id
    var onejob = await Job.findOne({ _id: id }).lean()
    res.send(onejob)
}

exports.EditJob = async (req,res) => {
    var id = req.params.id
    var oldData = await Job.findById(id).lean()
    const {designation,position,jobDescription,limit} = req.body;

    var editjob = {
        designation:designation,
        positions:position,
        appliedBy: oldData.appliedBy,
        jobDescription:jobDescription,
        limit:limit
    }

    var JobEdit = await Job.findOneAndReplace({_id:id},editjob)
    res.send(JobEdit)
}