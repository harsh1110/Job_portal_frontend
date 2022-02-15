const express = require('express');
const { CreateNewInterview, allIntreviews, OneIntreview } = require('../Controller/interviewControler');
const { verifyAccessToken } = require('../Middlewares/jwt');
const router = express.Router()


//InterviewRoutes

router.post("/create", verifyAccessToken, CreateNewInterview)
router.get("/all", verifyAccessToken, allIntreviews)
router.get("/one/:id", verifyAccessToken, OneIntreview)


module.exports = router