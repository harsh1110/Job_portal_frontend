const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express()
require('dotenv').config();
const dbConnect = require("./Config/dbConnect")
const port = process.env.PORT
const userRoute = require("./Routes/userRoute")
const jobRoute = require("./Routes/jobRoute")
const jobApplyRoute = require("./Routes/applyJobRoute")
app.use(cors())
app.use(express.json())
dbConnect()


//User-Routes
app.use("/",userRoute)
app.use("/job",jobRoute)
app.use("/job/apply",jobApplyRoute)





app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})

