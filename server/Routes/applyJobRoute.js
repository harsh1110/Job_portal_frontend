const express = require('express');
const {OneJob, allApplyJob,JobApplyPerUser, AllPerticularJobId, NewJobApply } = require('../Controller/jobApplyControler');
const router = express.Router()
const upload = require("../Middlewares/multer")


//JobRoutes

router.get("/all", allApplyJob)
router.get("/one/:id", OneJob)
router.get("/all/:id", AllPerticularJobId)
router.post("/user", upload.single("resume"), NewJobApply)
router.get("/user/:id", JobApplyPerUser)


module.exports = router