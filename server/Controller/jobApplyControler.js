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