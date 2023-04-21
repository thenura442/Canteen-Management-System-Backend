const router = require("express").Router();
let item = require("../../Controllers/item.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", item.createItem);
router.post("/get", item.getAllItems);
router.post("/get/id", item.getItem);
router.post("/update/id", item.updateItem);
router.post("/delete/id", item.deleteItem);

module.exports = router;