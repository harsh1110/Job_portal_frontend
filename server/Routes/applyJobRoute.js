const express = require('express');
const { JobApply, OneJob, allApplyJob,JobApplyPerUser, AllPerticularJobId } = require('../Controller/jobApplyControler');
const router = express.Router()


//JobRoutes

router.get("/all", allApplyJob)
router.get("/one/:id", OneJob)
router.get("/all/:id", AllPerticularJobId)
router.post("/user", JobApply)
router.get("/user/:id", JobApplyPerUser)


module.exports = router