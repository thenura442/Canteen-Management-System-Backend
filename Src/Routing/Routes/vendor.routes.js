const router = require("express").Router();
let vendor = require("../../Controllers/vendor.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", vendor.createVendor);
router.get("/get", vendor.getAllVendors);
router.post("/get/id", vendor.getVendor);
router.put("/update/id", vendor.updateVendor);
router.delete("/delete/id", vendor.deleteVendor);

module.exports = router;