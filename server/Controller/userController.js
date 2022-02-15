const User = require('../Models/userModel');
const { uploadsingle } = require("../Middlewares/cloudinary")
const {signAccessToken} = require("../Middlewares/jwt")
const fs = require('fs')


//homepage function
exports.homePage = async (req, res) => {
    console.log(req.headers.authorization);
    res.send("<h1>Hello Welcome to E-Commerce Server</h1>")
}

//alluser data
exports.allUser = async (req, res) => {
    var allUser = await User.find({}).lean()
    res.send(allUser)
}


//one user api
exports.OneUser = async (req, res) => {
    console.log(req.headers.authorization);
    var id = req.params.id
    var oneuser = await User.findById(id).lean()
    res.send(oneuser)
}
exports.DeleteProfilePic = async (req, res) => {
    var id = req.params.id
    var oneuser = await User.findById(id).lean()
    var createUser = {
        name: oneuser.name,
        email: oneuser.email,
        phone: oneuser.phone,
        pic: "",
        pass: oneuser.pass,
        conpass: oneuser.conpass,
    }
    const deletepic = await User.findOneAndReplace({ _id: id }, createUser);
    console.log("profile pic deleted", deletepic);
    if (deletepic) {
        res.status(200).send({ msg: "success" })
    }
    else {
        res.status(400).send({ msg: 'Error' })
    }
}

//New user create function
exports.CreateUser = async (req, res) => {
    // try {
        console.log(req.body);
        const { name, email, phone, pass, role } = req.body
        const pic = req.file
        var path = await uploadsingle(pic.path)
        fs.unlink(pic.path, () => {
            res.send({
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
                role: role,
                pass: pass,
            })
            createUser.save()
            if (createUser) res.json({ success: "User added Successfully" })
        }
    // }
    // catch {
    //     res.json({ msg: "user creation fail" })
    // }
}

//login user

exports.Login = async (req, res) => {
    const { email, pass } = req.body
    const authUser = await User.findOne({ email: email, pass: pass })

    const accessToken = await signAccessToken(authUser)
    if (authUser) {
        res.json({
            "token":accessToken,
            "id":authUser._id
        })
    }
    else {
        res.status(400).send({ msg: 'Error' })
    }
}

exports.UpdateUser = async (req, res) => {
    var id = req.params.id
    const { name, email, phone, pass, role, profile } = req.body
    const pic = req.file
    var path = ""
    if (pic) {
        if (pic.path) {
            var img = pic.path
            path = await uploadsingle(img)
            fs.unlink(pic.path, () => {
                res.send({
                    status: "200",
                    responseType: "string",
                    response: "success"
                })
            })
            console.log(path);
        }
    }
    else {
        var img = await User.findById(id).lean()
        path = img.pic
    }
    var createUser = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        pic: path,
        pass: pass,
    }

    const updateuser = await User.findOneAndReplace({ _id: id }, createUser);
    console.log("1 document updated", updateuser);
    if (updateuser) {
        res.send(updateuser)
    }
    else {
        res.status(400).send({ msg: 'Error' })
    }
}

