const router = require("express").Router();
let employee = require("../../Controllers/employee.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", employee.createEmployee);
router.post("/get/id", employee.findEmployee);
router.post("/update/id", employee.updateEmployee);
router.post("/update/pass", employee.updateEmployeePassword);
router.post("/update/picture", employee.updatePicture);
router.post("/delete/id", employee.deleteEmployee);

module.exports = router;