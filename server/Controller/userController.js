const express = require('express');
const User = require('../Models/userModel');
const { uploadsingle } = require("../Middlewares/cloudinary")
const jwt = require('jsonwebtoken');
const fs = require('fs')

//homepage function
exports.homePage = async (req, res) => {
    res.send("<h1>Hello Welcome to E-Commerce Server</h1>")
}

//alluser data
exports.allUser = async (req, res) => {
    var allUser = await User.find({}).lean()
    res.send(allUser)
}


//one user api
exports.OneUser = async (req, res) => {
    var id = req.params.id
    var oneuser = await User.findOne({ _id: id }).lean()
    res.send(oneuser)
}

//New user create function
exports.CreateUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, pass } = req.body
        const pic = req.file
        var path = await uploadsingle(pic.path)
        fs.unlink(pic.path,()=>{
            res.send ({
              status: "200",
              responseType: "string",
              response: "success"
            })
        })
        console.log(path);
        if (path.length !== 0) {
            var createUser = await User.create({
                name: name,
                email: email,
                phone: phone,
                pic: path,
                pass: pass,
            })
            createUser.save()
            if (createUser) res.json({ success: "User added Successfully" })
        }
    }
    catch{
        res.json({msg:"user creation fail"})
    } 
}

//login user

exports.Login = async (req, res) => {
    const { email, pass } = req.body
    const authUser = await User.findOne({ email: email, pass: pass })
    if (authUser) {
        res.send(authUser)
    }
    else {
        res.status(400).send({ msg: 'Error' })
    }
}

exports.UpdateUser = async (req,res) => {
    const{newname,newemail,newphone,newpass,newconpass,id} = req.body
    var pic = req.files.pic
        console.log(req.body);
        console.log(req.files);
        var path = []
        if (!pic) {
            path = await Users.findOne({ _id: id }).lean().pic
        }
        else {
            if (pic.name) {
                var img = pic.tempFilePath
                var data = await uploadToCloudinary(img, path)
                console.log(data);
                var createUser = {
                    name: newname,
                    email: newemail,
                    phone: newphone,
                    pic: data,
                    pass: newpass,
                    conpass: newconpass,
                }
            }
            else{
                for (let i = 0; i < pic.length; i++) {
                    var img = pic[i].tempFilePath
                    var data = await uploadToCloudinary(img, path)
                    console.log(data);
                    if (path.length === pic.length) {
                        var createUser = {
                            name: newname,
                            email: newemail,
                            phone: newphone,
                            pic: data,
                            pass: newpass,
                            conpass: newconpass,
                        }
                    }
                }
            }
        }
    const updateuser = await User.findOneAndReplace({ _id: id }, createUser);
    console.log("1 document updated",updateuser);
    if(updateuser){
    res.send(updateuser)
    }
    else{
        res.status(400).send({msg:'Error'})
    }
}

