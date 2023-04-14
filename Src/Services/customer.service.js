const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/customer.model" ); // Database Model
const { registerCustomerValidation } = require("../Validation/customer.validation");
const bcrypt = require('bcryptjs');


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel.Customer );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {
        //Validating with joi schema by calling validateRegistration function at the end of the page
        if(body != null){
            let { error } = await registerCustomerValidation(body);
            if (error) return {Status: "400" , Error: error.details[0].message }
        }

        //Check if email already exists
        let emailExist = await this.findEmailExist(body.email);
        if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email Already Exists!" }

        //Hashing the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt)
        body.password = hashedPassword;

        //Creating the User
        return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - create(body)"};
    }
  }


  /**
   * @description Attempt to find a post with the provided email
   * @param body {object} Object containing 'email' field to
   * find specific post
   * @returns {Object}
   */
  async findOne( body ) {
    try {
        return await this.MongooseServiceInstance.findOne({email : body.email})
    } 
    catch ( err ) {
        console.log( err)
        return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - findOne(body)"};
    }
  }



    /**
   * @description Attempt to update a post with the provided object
   * @param body {object} Object containing 'email' field and the updated body
   * to update specific post
   * @returns {Object}
   */
    async updateOne( body ) {
        try {    
            //Validating with joi schema
            if(body != null){
                let { error } = await registerCustomerValidation(body);
                if (error) return {Status: "400" , Error: error.details[0].message }
            }

            //Updating document and returning result
            return await this.MongooseServiceInstance.updateOne({email : body.email},body);
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - updateOne(body)" };
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
            //Hashing the Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt)
            body.password = hashedPassword;

            //Updating document and returning result
            return await this.MongooseServiceInstance.updateOne({email : body.email},{password : body.password});
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - updatePassword(body)" };
        }
    }



      /**
   * @description Attempt to delete a post with the provided object
   * @param body {object} Object containing 'email' field to delete specific post
   * @returns {Object}
   */
  async deleteOne( body ) {
    try {
      return await this.MongooseServiceInstance.deleteOne({email: body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/customer.service.js - deleteOne(body)"};
    }
  }



    /**
   * @description Attempt to find if provided email exists in database
   * @param email {object} Object containing 'email' field to
   * find post
   * @returns {Object}
   */
    async findEmailExist( email ) {
        try {
            return await this.MongooseServiceInstance.findOne({email : email});
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/customer.service.js - findEmailExist(email)"};
        }
      }
}

module.exports = FileService;