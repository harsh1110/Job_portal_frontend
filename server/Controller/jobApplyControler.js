const JobApply = require('../Models/jobApplyModel')

exports.allUser = async (req, res) => {
    var allUser = await User.find({}).lean()
    res.send(allUser)
}

exports.OneUser = async (req, res) => {
    var id = req.params.id
    var oneuser = await User.findOne({ _id: id }).lean()
    res.send(oneuser)
}

exports.JobApply = async (req, res) => {
    try {
        console.log(req.body);
        const { jobid, name, email, phone, date, employstatus, reference} = req.body
        var jobApply = await JobApply.create({
            jobId: jobid,
            name: name,
            email: email,
            phone: phone,
            date: date,
            employStatus: employstatus,
            Reference: reference,
        
        })
    
        jobApply.save()
        if (jobApply) res.send({ success : "job Applied Sucessfully"})
    }
    catch {
        res.json({ error: "Job Apply fail" })
    }

}