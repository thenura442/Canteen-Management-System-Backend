const router = require("express").Router();
let vendor = require("../../Controllers/vendor.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", vendor.createVendor);
router.get("/get",vendor.getAllVendors);
router.post("/get/id", vendor.findOne);
router.put("/update/id", vendor.updateOne);
router.post("/delete/id", vendor.deleteOne);

module.exports = router;