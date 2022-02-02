const cloudinary = require("cloudinary")
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploadsingle = (locaFilePath) => {
    return cloudinary.uploader.upload(locaFilePath,{
        folder:"/ecommerce/user",
        public_id:Date.now()
    })
        .then((value) => {
            return value.url
        })
}