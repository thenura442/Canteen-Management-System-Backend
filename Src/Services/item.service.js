// services/PostService.js
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/item.model" ); // Database Model
const { VendorValidation } = require("../Validation/item.validation");


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel.Item );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {

      if(body != null){
        let { error } = VendorValidation(body);
        return error
      }

      return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - create(body)"};
    }
  }


  /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' field to
   * find posts
   * @returns {Object}
   */
  async find( body ) {
    try {
        let result =await this.MongooseServiceInstance.find();
        if(result == null) { return {status: 400}}
        return result;
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - find(body)"};
    }
  }



  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async findOne( body ) {
    try {
      let result =await this.MongooseServiceInstance.findById( body._id);
      if(result == null) { return {status: 400}}
      return result;
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - findSubject(body)"};
    }
  }


  /**
   * @description Attempt to find a update with the provided object
   * @param body {object} Object containing '_id' field to
   * update specific post
   * @returns {Object}
   */
  async update( body ) {
    try {
      return await this.MongooseServiceInstance.update( body._id,body);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - updateSubject(body)"};
    }
  }



  /**
   * @description Attempt to delete vendor with the provided id
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async delete( body ) {
    try {
      return await this.MongooseServiceInstance.deleteOne({_id: body._id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/subject.service.js - deleteSubject(body)"};
    }
  }
}


module.exports = FileService;