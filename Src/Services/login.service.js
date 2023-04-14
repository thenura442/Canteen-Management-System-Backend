const bcrypt = require('bcryptjs');
//const auth = require('../Middleware/auth');
const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModelEmployee = require("../Models/employee.model"); // Database Model
const FileModelCustomer = require("../Models/customer.model"); // Database Model
const { loginWebValidation } = require("../Validation/login.validation");


class LoginService {

    constructor() { }


    /**
     * @description Attempt to login with the provided object
     * @param body {object} Object containing 'email' and 'passwords' fields to
     * get authenticated
     * @returns {Object}
     */
    async loginAndAuthenticateWeb(body) {
        try {
            //Validate user login with Joi Schema
            let { error } = await loginWebValidation(body)
            if (error) return { Status: "400", Error: error.details[0].message }

            //Check if email exists
            let User = await this.findEmailExist(body);
            if (!User) return { Status: "400", Error: "Email or Password is Incorrect" }
            console.log(User)

            //Checking Password
            console.log(User.password)
            console.log(body.password)
            console.log(( await bcrypt.compare(body.password, User.password)))
            const validPassword = await bcrypt.compare(body.password, User.password)
            if (validPassword == 'true') return { Status: "400", Error: "Email or Password is Wrong Incorrect" }

            console.log(validPassword)
            return { Status: 200 };

            // //User Authorization Token with Jwt Authentication
            // let user = { _id: User._id, email: User.email, type: User.type };
            // let token = auth.authenticateToken(user);
            // return { Status: 200, Token: token.accessToken, Refresh: token.refreshToken, _id: User._id, email: User.email, type: User.type, grade: User.grade, dle_access: User.dle_access }
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/login.service.js - loginAndAuthenticate(body)" };
        }
    }



    /**
     * @description Attempt to find posts with the provided object
     * @param body {object} Object containing 'type' and 'email;' fields to
     * find posts
     * @returns {Object}
     */
    async findEmailExist(body) {
        try {
            let model;
            if (body.type === "owner" || body.type === "employee") {
                model = FileModelEmployee.Employee
            }
            else {
                model = FileModelCustomer.Customer
            }
            
            this.MongooseServiceInstance = new MongooseService(model);
            return await this.MongooseServiceInstance.findOne({ email: body.email });
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/login.service.js - findEmailExist(body)" };
        }
    }
}

module.exports = LoginService;