const express = require('express');
const { CreateNewJob, allJob, OneJob } = require('../Controller/jobController');
const router = express.Router()


//JobRoutes

router.post("/create",CreateNewJob)
router.get("/all",allJob)
router.get("/one/:id",OneJob)


module.exports = router