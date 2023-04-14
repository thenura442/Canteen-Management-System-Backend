const router = require('express').Router();

let login = require('./Routes/login.routes');
let employee = require('./Routes/employee.routes')
let customer = require('./Routes/customer.routes')
let vendor = require('./Routes/vendor.routes')
let item = require('./Routes/item.routes')


//All the Routes that are available in the application are divided into related route files and are called below.
router.use('/auth', login);
router.use('/employee', employee);
router.use('/customer', customer);
router.use('/vendor', vendor);
router.use('/item', item);

module.exports = router;