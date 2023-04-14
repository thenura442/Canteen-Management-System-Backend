const router = require("express").Router();
let customer = require("../../Controllers/customer.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", customer.createCustomer);
router.post("/get/id", customer.findCustomer);
router.put("/update/id", customer.updateCustomer);
router.put("/update/password", customer.updateCustomerPassword);
router.delete("/delete/id", customer.deleteCustomer);

module.exports = router;