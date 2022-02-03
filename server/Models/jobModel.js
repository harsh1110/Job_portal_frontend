const mongoose = require('mongoose');

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
    user: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Jobs", Job)