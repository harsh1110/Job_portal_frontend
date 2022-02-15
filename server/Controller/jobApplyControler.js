const { uploadsingle } = require('../Middlewares/cloudinary')
const JobApply = require('../Models/jobApplyModel')
const Job = require('../Models/jobModel')
const fs = require("fs")

exports.allApplyJob = async (req, res) => {
    var allJobApply = await JobApply.find({}).lean()
    res.send(allJobApply)
}

exports.OneJob = async (req, res) => {
    var id = req.params.id
    var onejob = await JobApply.findOne({ _id: id }).lean()
    res.send(onejob)
}
exports.AllPerticularJobId = async (req, res) => {
    var id = req.params.id
    var onejob = await JobApply.find({ jobId: id }).lean()
    res.send(onejob)
}

exports.JobApplyPerUser = async (req, res) => {
    var id = req.params.id
    var allAppliedJobPerUser = await JobApply.find({ AppliedBy: id }).lean()
    res.send(allAppliedJobPerUser)
}
exports.getStatus = async (req, res) => {
    var status = req.params.status
    var allAppliedJobwithStatus = await JobApply.find({ ApplicationStatus: status }).lean()
    res.send(allAppliedJobwithStatus)
}
exports.changeStatus = async (req, res) => {
    var id = req.params.id
    var { status } = req.body
    var oldVal = await JobApply.findOne({ _id: id }).lean()
    var newVal = {
        jobId: oldVal.jobId,
        name: oldVal.name,
        email: oldVal.email,
        phone: oldVal.phone,
        date: oldVal.date,
        designation: oldVal.designation,
        employStatus: oldVal.employStatus,
        ApplicationStatus: status,
        Reference: oldVal.Reference,
        Resume: oldVal.Resume,
    }
    var success = await JobApply.findOneAndReplace({ _id: id }, newVal)
    if (success) {
        res.json({ msg: "success" })
    }
    else {
        res.json({ msg: "fail" })
    }
}
const changeLimit = async (id) => {
    var oldVal = await Job.findOne({ _id: id }).lean()
    if (oldVal.limit === 0) {

    }
    else {
        var limit = parseFloat(oldVal.limit) - 1
        var appliedBy = parseFloat(oldVal.appliedBy) + 1
        console.log(limit);
        var newVal = {
            designation: oldVal.designation,
            jobDescription: oldVal.jobDescription,
            positions: oldVal.positions,
            limit: limit,
            appliedBy: appliedBy,
            createdBy: oldVal.createdBy
        }
        var success = await Job.findOneAndReplace({ _id: id }, newVal)
        if (success) {
            console.log({ msg: "success" })
        }
        else {
            console.log({ msg: "fail" })
        }
    }
}

exports.NewJobApply = async (req, res) => {
    try {
        console.log(req.body);
        const { jobId, designation, name, email, phone, date, employment, refname, refphone } = req.body
        const resume = req.file
        console.log(resume)
        var path = await uploadsingle(resume.path)
        console.log(path);
        changeLimit(jobId)
        fs.unlink(resume.path, () => {
            res.send({
                response: "success"
            })
        })
        var refObj = {
            refname: refname,
            refphone: refphone
        }
        var createApply = await JobApply.create({
            jobId: jobId,
            name: name,
            email: email,
            phone: phone,
            date: date,
            designation: designation,
            employStatus: employment,
            ApplicationStatus: "Pending",
            Reference: refObj,
            Resume: path,
        })
        createApply.save()
        if (createApply) {
            console.log({ success: "Job Applied Sucessfully" })
        }
    }
    catch {
        res.json({ error: "Job Apply fail" })
    }

}

