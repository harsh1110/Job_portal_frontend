const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const Interview = mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: "JobApply"
    },
    Date: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String
    },
    Time: {
        type: String
    },
    link: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Interviews", Interview)