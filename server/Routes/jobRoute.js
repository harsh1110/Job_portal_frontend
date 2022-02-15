const express = require('express');
const { CreateNewJob, allJob, OneJob, EditJob } = require('../Controller/jobController');
const { verifyAccessToken } = require('../Middlewares/jwt');
const router = express.Router()


//JobRoutes

router.post("/create", verifyAccessToken, CreateNewJob)
router.get("/all", verifyAccessToken, allJob)
router.get("/one/:id", OneJob)
router.post("/one/:id", verifyAccessToken, EditJob)


module.exports = router