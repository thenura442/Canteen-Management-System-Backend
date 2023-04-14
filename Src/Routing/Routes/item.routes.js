const router = require("express").Router();
let item = require("../../Controllers/item.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", item.createItem);
router.get("/get", item.getAllItems);
router.post("/get/id", item.getItem);
router.put("/update/id", item.updateItem);
router.delete("/delete/id", item.deleteItem);

module.exports = router;