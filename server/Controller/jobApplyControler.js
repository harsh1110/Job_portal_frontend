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

exports.JobApplyPerUser = async(req,res) => {
    var id = req.params.id
    var allAppliedJobPerUser = await JobApply.find({ AppliedBy: id }).lean()
    res.send(allAppliedJobPerUser)
}

exports.JobApply = async (req, res) => {
    try {
        console.log(req.body);
        const { jobId, name, email, phone, date, employstatus, reference,userId} = req.body
        var createApply = await JobApply.create({
            jobId: jobId,
            name: name,
            email: email,
            phone: phone,
            date: date,
            employStatus: employstatus,
            Reference: reference,
            AppliedBy:userId
        })
    
        await createApply.save()
        if (createApply) res.send({ success : "job Applied Sucessfully"})
    }
    catch {
        res.json({ error: "Job Apply fail" })
    }

}