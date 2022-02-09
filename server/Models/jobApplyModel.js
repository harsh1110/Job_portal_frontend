const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const JobApply = mongoose.Schema({
    jobId: {
        type: ObjectId,
        ref: "Jobs"
    },
    designation: {
        type: String
    },
    name: {
        type: String
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
        type: Object
    },
    ApplicationStatus: {
        type: String
    },
    Resume: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model("JobApply", JobApply)