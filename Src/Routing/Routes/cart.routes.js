const router = require("express").Router();

const multer = require('../../Middleware/multer');
let cart = require("../../Controllers/cart.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", cart.createCart);
router.post("/get", cart.getCart);
router.post("/update", cart.updateCart);
router.post("/delete", cart.deleteCart);
router.post("/delete/item", cart.deleteItem);

module.exports = router;