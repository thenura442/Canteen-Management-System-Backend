const router = require("express").Router();

const multer = require('../../Middleware/multer');
let upload = require("../../Controllers/upload.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", multer.upload, upload.createUpload);


//router.post("/update", multer.uploadMany ,upload.updateUpload);

module.exports = router;