const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModel = require("../Models/customer.model"); // Database Model
const { registerCustomerValidation } = require("../Validation/customer.validation");
const bcrypt = require('bcryptjs');


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(FileModel.Customer);
  }


  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create(body) {
    try {
      //Validating with joi schema by calling validateRegistration function at the end of the page
      if (body != null) {
        let { error } = await registerCustomerValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
        
      }

      //Check if email already exists
      let emailExist = await this.findEmailExist(body.email);
      if (emailExist) return { Status: "400", Email: emailExist.email, Error: "Email Already Exists!" }

      //Hashing the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt)
      body.password = hashedPassword;

      //Creating the User
      let result = await this.MongooseServiceInstance.create(body)
      if(result.email === body.email){
        return { message : "success" }
      }

      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - create(body)" };
    }
  }


  /**
   * @description Attempt to find a post with the provided email
   * @param body {object} Object containing 'email' field to
   * find specific post
   * @returns {Object}
   */
  async findOne(body) {
    try {
      let result = await this.MongooseServiceInstance.findOne({ email: body.email })
      if(result.email != null || result.email != ""){
        return { first_name : result.first_name, last_name : result.last_name , nic : result.nic , dob : result.dob , email : result.email , mobile_no : result.mobile_no , address : result.address , access : result.access , url : result.url }
      }
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - findOne(body)" };
    }
  }



  /**
 * @description Attempt to update a post with the provided object
 * @param body {object} Object containing 'email' field and the updated body
 * to update specific post
 * @returns {Object}
 */
  async updateOne(body) {
    try {
      //Validating with joi schema
      if (body != null) {
        let { error } = await registerCustomerValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      //Updating document and returning result
      let result = await this.MongooseServiceInstance.updateOne({ email: body.email }, body);
      if(result.modifiedCount === 1){
        return { message : "success" }
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - updateOne(body)" };
    }
  }



  /**
 * @description Attempt to update a post with the provided object
 * @param body {object} Object containing 'email' field and the updated body
 * to update specific post
 * @returns {Object}
 */
  async updateMobile(body) {
    try {
      //Updating document and returning result
      let result = await this.MongooseServiceInstance.updateOne({ email: body.email }, { mobile_no: body.mobile_no });
      if(result.modifiedCount === 1){
        return { message : "success" }
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - updateMobile(body)" };
    }
  }



   /**
   * @description Attempt to update a post with the provided object
   * @param body {object} Object containing 'email' field and the updated body
   * to update specific post
   * @returns {Object}
   */
   async updatePassword( body ) {
    try {
        if(body.new_password != body.retype_new_password){return {Status : 400 , Error: "Passwords do not Match"}}

        let user = await this.MongooseServiceInstance.findOne({email : body.email})
        if(!user){ return null }

        const validPassword = await bcrypt.compare(body.old_password, user.password)
        if (!validPassword) return { Status: 400, Error: "Please Enter the Valid Old Password" }

      //   //Hashing the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.new_password, salt)

        //Updating document and returning result
        let result = await this.MongooseServiceInstance.updateOne({email : body.email},{password : hashedPassword});
        if(result.modifiedCount === 1){
          return { message : "success" }
        }
        return result;
    } 
    catch ( err ) {
        console.log( err)
        return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - updatePassword(body)" };
    }
}



  /**
* @description Attempt to delete a post with the provided object
* @param body {object} Object containing 'email' field to delete specific post
* @returns {Object}
*/
  async deleteOne(body) {
    try {
      let result = await this.MongooseServiceInstance.deleteOne({ email: body.email });
      if(result.deletedCount === 1){
        return { message : "success" }
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/customer.service.js - deleteOne(body)" };
    }
  }



  /**
 * @description Attempt to find if provided email exists in database
 * @param email {object} Object containing 'email' field to
 * find post
 * @returns {Object}
 */
  async findEmailExist(email) {
    try {
      return await this.MongooseServiceInstance.findOne({ email: email });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - findEmailExist(email)" };
    }
  }
}

module.exports = FileService;