const router = require("express").Router();
let employee = require("../../Controllers/employee.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", employee.createEmployee);
router.post("/get/id", employee.findEmployee);
router.put("/update/id", employee.updateEmployee);
router.put("/update/password", employee.updateEmployeePassword);
router.delete("/delete/id", employee.deleteEmployee);

module.exports = router;