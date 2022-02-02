const mongoose = require('mongoose');
require("dotenv").config()

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = dbConnection
