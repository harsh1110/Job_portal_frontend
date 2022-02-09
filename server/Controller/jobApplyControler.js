const { uploadsingle } = require('../Middlewares/cloudinary')
const JobApply = require('../Models/jobApplyModel')

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

exports.JobApplyPerUser = async(req,res) => {
    var id = req.params.id
    var allAppliedJobPerUser = await JobApply.find({ AppliedBy: id }).lean()
    res.send(allAppliedJobPerUser)
}
exports.getStatus = async(req,res) => {
    var status = req.params.status
    var allAppliedJobwithStatus = await JobApply.find({ ApplicationStatus: status }).lean()
    res.send(allAppliedJobwithStatus)
}

exports.NewJobApply = async (req, res) => {
    try {
        console.log(req.body);
        const { jobId, designation, name, email, phone, date, employment, refname,refphone} = req.body
        const resume = req.file
        console.log(resume)
        var path = await uploadsingle(resume.path)
        console.log(path);
        // fs.unlink(`/${resume.path}`)
        var refObj={
            refname:refname,
            refphone:refphone
        }
        var createApply = await JobApply.create({
            jobId: jobId,
            name: name,
            email: email,
            phone: phone,
            date: date,
            designation:designation,
            employStatus: employment,
            ApplicationStatus:"pending",
            Reference: refObj,
            Resume:path,
        })
        await createApply.save()
        if (createApply) res.json({success:"Job Applied Sucessfully"})
    }
    catch {
        res.json({ error: "Job Apply fail"})
    }

}