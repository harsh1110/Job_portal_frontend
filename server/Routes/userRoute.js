const express = require('express');
const { homePage, CreateUser, allUser, Login, OneUser, UpdateUser, DeleteProfilePic } = require('../Controller/userController');
const upload = require('../Middlewares/multer');
const router = express.Router()
const { verifyAccessToken } = require("../Middlewares/jwt")


//homepage
router.get('/', verifyAccessToken, homePage)
router.get('/all', verifyAccessToken, allUser)
router.get('/user/:id', verifyAccessToken, OneUser)
router.post('/update-user/:id', verifyAccessToken, upload.single("pic"), UpdateUser)
router.delete('/pic/:id', verifyAccessToken, DeleteProfilePic)


router.post('/add-user', upload.single("pic"), CreateUser)
router.post('/login', Login)


module.exports = router