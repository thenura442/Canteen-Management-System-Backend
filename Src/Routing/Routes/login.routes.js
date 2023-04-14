const router = require("express").Router();
let login = require("../../Controllers/login.controller")

//Route of login
router.post("/login", login.loginWebUser);
router.get("/logout", login.logoutWebUser);

module.exports = router;