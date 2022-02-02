const express = require('express');
const { homePage, CreateUser, allUser, Login, OneUser } = require('../Controller/userController');
const router = express.Router()


//homepage
router.get('/',homePage)
router.get('/all',allUser)
router.get('/user/:id',OneUser)


router.post('/add-user',CreateUser)
router.post('/login',Login)


module.exports = router