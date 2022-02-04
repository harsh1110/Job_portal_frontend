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
        type: Date
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
    createdBy: {
        type: ObjectId,
        ref: "Users" 
    },
}, { timestamps: true })

module.exports = mongoose.model("JobApply", JobApply)