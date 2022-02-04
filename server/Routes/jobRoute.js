const express = require('express');
const { JobApply } = require('../Controller/jobApplyControler');
const { CreateNewJob, allJob, OneJob } = require('../Controller/jobController');
const router = express.Router()


//JobRoutes

router.post("/create",CreateNewJob)
router.get("/all",allJob)
router.get("/one/:id",OneJob)
router.post("/user/apply",JobApply)


module.exports = router