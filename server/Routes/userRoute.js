const express = require('express');
const { homePage, CreateUser, allUser, Login, OneUser, UpdateUser } = require('../Controller/userController');
const upload = require('../Middlewares/multer');
const router = express.Router()


//homepage
router.get('/',homePage)
router.get('/all',allUser)
router.get('/user/:id',OneUser)
router.post('/update-user/:id',UpdateUser)


router.post('/add-user', upload.single("pic"),CreateUser)
router.post('/login',Login)


module.exports = router