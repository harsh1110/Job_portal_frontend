const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


// hasing the password

// User.pre('save', async function (next){

//     console.log("Hii from bcrypt.")

//     if (this.isModified('password')){
//         this.pass = bcrypt.hash(this.pass, 12);
//         this.conpass = bcrypt.hash(this.conpass, 12);
//     }
//     (next);
// });

module.exports = mongoose.model("Users",User)