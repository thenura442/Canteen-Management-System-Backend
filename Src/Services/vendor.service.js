// services/PostService.js
const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModel = require("../Models/vendor.model"); // Database Model
const { registerVendorValidation } = require("../Validation/vendor.validation");
const aws = require('../Middleware/aws-bucket');
const fs = require('fs');


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(FileModel.Vendor);
  }


  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create(body) {
    try {
      //Validating with joi schema by calling VendorValidation function
      if (body != null) {
        let { error } = registerVendorValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      //Check if email already exists
      let emailExist = await this.findEmailExist(body.email);
      if (emailExist) return { Status: "400", Email: emailExist.email, Error: "Email Already Exists!" }

      if( body.url != "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png"){
        let aws_url =  await aws.uploadfile(body.url)


        fs.unlink(body.url, (err) => {
          if (err) {
              throw err;
          }

          console.log("Delete File successfully.");
        }); 
        body.url = aws_url.Location;
      }
    
      let result = await this.MongooseServiceInstance.create(body)
      if(result.email === body.email){
        return { message : "success"}
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - create(body)" };
    }
  }


  /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'email' field to
   * find posts
   * @returns {Object}
   */
  async find(body) {
    try {
      return await this.MongooseServiceInstance.find();
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - find(body)" };
    }
  }



   /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'email' field to
   * find posts
   * @returns {Object}
   */
   async findAvailable(body) {
    try {
      return await this.MongooseServiceInstance.find({access: "open"});
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - find(body)" };
    }
  }



  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing 'email' field to
   * find specific post
   * @returns {Object}
   */
  async findOne(body) {
    try {
      return await this.MongooseServiceInstance.findOne({ email: body.email });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - findSubject(body)" };
    }
  }


  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing 'email' field to
   * find specific post
   * @returns {Object}
   */
  async findOneAvailable(body) {
    try {
      return await this.MongooseServiceInstance.findOne({ email: body.email, access: "open" });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - findSubject(body)" };
    }
  }


  /**
   * @description Attempt to find a update with the provided object
   * @param body {object} Object containing 'email' field to
   * update specific post
   * @returns {Object}
   */
  async update(body) {
    try {

      //Validating with joi schema by calling VendorValidation function
      if (body != null) {
        let { error } = registerVendorValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      //Check if image is the same
      let imageExist = await this.findOne({ email: body.email });
      if (imageExist != null && imageExist.url === body.url) {
        return await this.MongooseServiceInstance.updateOne({ email: body.email }, body);
      }

      if (imageExist != null && imageExist.url != body.url) {

        await aws.deletefile(imageExist.url);

        let aws_url = await aws.uploadfile(body.url)


        fs.unlink(body.url, (err) => {
          if (err) {
            throw err;
          }

          console.log("Deleted File successfully.");
        });


        body.url = aws_url.Location;
        
        return await this.MongooseServiceInstance.updateOne({ email: body.email }, body);
      }
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - updateSubject(body)" };
    }
  }



  /**
   * @description Attempt to delete vendor with the provided id
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async delete(body) {
    try {
      if( body.url != "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png"){
        await aws.deletefile(body.url);
      }
      
      let result = await this.MongooseServiceInstance.deleteOne({ email: body.email });
      if(result.deletedCount === 1){
        return { message : "success" }
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - deleteSubject(body)" };
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