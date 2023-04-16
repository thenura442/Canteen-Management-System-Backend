const router = require("express").Router();
let vendor = require("../../Controllers/vendor.controller")

const multer = require("../../Middleware/multer");

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", multer.upload ,vendor.createVendor);
router.get("/get", vendor.getAllVendors);
router.post("/get/id", vendor.getVendor);
router.post("/update/id", vendor.updateVendor);
router.post("/delete/id", vendor.deleteVendor);

module.exports = router;