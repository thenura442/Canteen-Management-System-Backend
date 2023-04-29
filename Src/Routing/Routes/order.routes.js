const router = require("express").Router();

const multer = require('../../Middleware/multer');
let cart = require("../../Controllers/order.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", cart.createOrder);
router.post("/get", cart.getOrder);
router.post("/get/id", cart.getOrderId);

module.exports = router;