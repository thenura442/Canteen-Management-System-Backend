//const auth = require('../Middleware/auth');
const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModelEmployee = require("../Models/employee.model"); // Database Model
const FileModelCustomer = require("../Models/customer.model"); // Database Model
const { loginWebValidation , loginMobileValidation } = require("../Validation/login.validation");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


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

            //Checking Password
            const validPassword = await bcrypt.compare(body.password, User.password)
            if (!validPassword) return { Status: "400", Error: "Email or Password is Incorrect" }

            if( validPassword === true ) {
                return User
            }

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
     * @description Attempt to login with the provided object
     * @param body {object} Object containing 'email' and 'passwords' fields to
     * get authenticated
     * @returns {Object}
     */
     async loginAndAuthenticateMobile(body) {
        try {
            //Validate user login with Joi Schema
            let { error } = await loginMobileValidation(body)
            if (error) return { Status: "400", Error: error.details[0].message }

            //Check if email exists
            let User = await this.findEmailExist(body);
            if (!User) return { Status: "400", Error: "Email or Password is Incorrect" }

            //Checking Password
            const validPassword = await bcrypt.compare(body.password, User.password)
            if (!validPassword) return { Status: "400", Error: "Email or Password is Incorrect" }

            if( validPassword === true ) {
                return User
            }

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
     * @description Attempt to login with the provided object
     * @param body {object} Object containing 'email' and 'passwords' fields to
     * get authenticated
     * @returns {Object}
     */
    async forgotWebUser(body) {
        try {
            //Check if email exists
            let User = await this.findEmailExist(body);
            console.log(User)
            if (!User) return { Status: "400", Error: "Email not Found" }

            if (User.first_name != null && User.first_name != ""){
                var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var passwordLength = 12;
                var password = "";

                for (var i = 0; i <= passwordLength; i++) {
                    var randomNumber = Math.floor(Math.random() * chars.length);
                    password += chars.substring(randomNumber, randomNumber +1);
                }

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "adalanane1111@gmail.com",
                      pass: "otakugamer442"
                    }
                  });
                
                  let mailOptions = {
                    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
                    to: "adalanane111@gmail.coom", // list of receivers
                    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
                    html: `<h1>Hi Thenura </h1><br>
                    <h4>Thanks for joining us</h4>`
                  };
                
                  // send mail with defined transport object
                  let info = await transporter.sendMail(mailOptions);
                
                  callback(info);

                // //Hashing the Password
                // const salt = await bcrypt.genSalt(10);
                // const hashedPassword = await bcrypt.hash(body.password, salt)
                // body.password = hashedPassword;

                return { message : "Password reset send Successfully"}
            }
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/login.service.js - loginAndAuthenticate(body)" };
        }
    }


    /**
     * @description Attempt to login with the provided object
     * @param body {object} Object containing 'email' and 'passwords' fields to
     * get authenticated
     * @returns {Object}
     */
    async forgotMobileUser(body) {
        try {
            //Check if email exists
            let User = await this.findEmailExist(body);
            if (!User) return { Status: "400", Error: "Email not Found" }

            if (User.first_name != null && User.first_name != ""){
                var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var passwordLength = 12;
                var password = "";

                for (var i = 0; i <= passwordLength; i++) {
                    var randomNumber = Math.floor(Math.random() * chars.length);
                    password += chars.substring(randomNumber, randomNumber +1);
                }

                // //Hashing the Password
                // const salt = await bcrypt.genSalt(10);
                // const hashedPassword = await bcrypt.hash(body.password, salt)
                // body.password = hashedPassword;

                return { message : "Password reset send Successfully"}
            }
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
            if (body.type === "staff") {
                model = FileModelEmployee.Employee
            }
            else {
                model = FileModelCustomer.Customer
            }
            
            this.MongooseServiceInstance = new MongooseService(model);
            const result = await this.MongooseServiceInstance.findOne({ email: body.email });
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/login.service.js - findEmailExist(body)" };
        }
    }
}

module.exports = LoginService;