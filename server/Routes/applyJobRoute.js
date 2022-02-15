const express = require('express');
const { OneJob, allApplyJob, JobApplyPerUser, AllPerticularJobId, NewJobApply, getStatus, changeStatus } = require('../Controller/jobApplyControler');
const { verifyAccessToken } = require('../Middlewares/jwt');
const router = express.Router()
const upload = require("../Middlewares/multer")


//JobRoutes

router.get("/all", verifyAccessToken, allApplyJob)
router.get("/one/:id",  OneJob)
router.get("/all/:id", verifyAccessToken, AllPerticularJobId)
router.post("/user",  upload.single("resume"), NewJobApply)
router.get("/user/:id", verifyAccessToken, JobApplyPerUser)
router.get("/status/:status", verifyAccessToken, getStatus)
router.post("/change-status/:id", verifyAccessToken, changeStatus)


module.exports = router