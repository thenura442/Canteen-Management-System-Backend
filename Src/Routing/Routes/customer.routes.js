const router = require("express").Router();
let customer = require("../../Controllers/customer.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", customer.createCustomer);
router.post("/get/id", customer.findCustomer);
router.post("/update/id", customer.updateCustomer);
router.post("/update/mobile", customer.updateMobile);
router.post("/update/password", customer.updateCustomerPassword);
router.post("/delete/id", customer.deleteCustomer);

module.exports = router;