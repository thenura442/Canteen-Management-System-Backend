const router = require("express").Router();
let user = require("../../Controllers/user.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", user.createUser);
router.get("/get",user.getAllUsers);
router.post("/get/id", user.findOne);
router.put("/update/id", user.updateOne);
router.put("/update", user.updateMany);
router.post("/delete/id", user.deleteOne);
router.delete("/delete", user.deleteMany);

module.exports = router;