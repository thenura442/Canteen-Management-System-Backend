const router = require('express').Router();

let user = require('./Routes/user.routes')

//All the Routes that are available in the application are divided into related route files and are called below.
//router.use('/user', user);

module.exports = router;