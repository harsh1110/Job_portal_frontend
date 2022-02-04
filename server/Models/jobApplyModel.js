const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const JobApply = mongoose.Schema({
    jobId: {
        type: ObjectId,
        ref:"Jobs"
    },
    name: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    date: {
        type: String
    },
    employStatus: {
        type: String
    },
    Reference: {
        type: String
    },
    Resume: {
        type: String
    },
    AppliedBy: {
        type: ObjectId,
        ref: "Users" 
    },
}, { timestamps: true })

module.exports = mongoose.model("JobApply", JobApply)