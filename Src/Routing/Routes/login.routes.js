const router = require("express").Router();
let login = require("../../Controllers/login.controller")

//Route of login
router.post("/login/web", login.loginWebUser);
router.post("/login/mobile", login.loginMobileUser);
router.post("/forgot/web", login.forgotWebUser);
router.post("/forgot/mobile", login.forgotMobileUser);
router.get("/logout", login.logoutWebUser);

module.exports = router;