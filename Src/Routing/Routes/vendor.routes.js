const router = require("express").Router();
let vendor = require("../../Controllers/vendor.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", vendor.createVendor);
router.get("/get", vendor.getAllVendors);
router.get("/get/access", vendor.getAvailableVendors);
router.post("/get/id", vendor.getVendor);
router.post("/get/id/merchant", vendor.getMerchant);
router.post("/get/id/access", vendor.getAvailableVendor);
router.post("/update/id", vendor.updateVendor);
router.post("/delete/id", vendor.deleteVendor);

module.exports = router;