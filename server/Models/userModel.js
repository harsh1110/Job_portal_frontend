const mongoose = require('mongoose');

const User = mongoose.Schema({
        name: {
            type:String,
        },
        email: {
            type:String
        },
        phone: {
            type:Number
        },
        pic:{
            type:String
        },
        pass: {
            type:String
        },
        conpass: {
            type:String
        },
        role:{
            type:String
        }
},{timestamps:true})

module.exports = mongoose.model("Users",User)