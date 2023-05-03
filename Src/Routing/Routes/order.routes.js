const router = require("express").Router();

const multer = require('../../Middleware/multer');
let order = require("../../Controllers/order.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", order.createOrder);
router.post("/get", order.getOrder);
router.post("/update/status", order.updateStatus);
router.post("/get/id", order.getOrderId);

module.exports = router;