const router = require('express').Router();

let login = require('./Routes/login.routes');
let employee = require('./Routes/employee.routes')
let customer = require('./Routes/customer.routes')
let vendor = require('./Routes/vendor.routes')
let item = require('./Routes/item.routes')
let upload = require('./Routes/upload.routes')
let cart = require('./Routes/cart.routes')
let order = require('./Routes/order.routes')

//All the Routes that are available in the application are divided into related route files and are called below.
router.use('/auth', login);
router.use('/employee', employee);
router.use('/customer', customer);
router.use('/vendor', vendor);
router.use('/item', item);
router.use('/upload', upload);
router.use('/cart', cart);
router.use('/order', order);

module.exports = router;