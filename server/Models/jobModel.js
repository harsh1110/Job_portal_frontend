const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const Job = mongoose.Schema({
    designation: {
        type: String,
    },
    jobDescription: {
        type: String
    },
    positions: {
        type: Number
    },
    limit: {
        type: Number
    },
    appliedBy: {
        type: Number
    },
    createdBy: {
        type: ObjectId,
        ref: "Users" 
    },
}, { timestamps: true })

module.exports = mongoose.model("Jobs", Job)