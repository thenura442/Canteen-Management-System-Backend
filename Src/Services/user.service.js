// services/PostService.js
const bcrypt = require('bcryptjs');
const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/user.model" ); // Database Model
const { registerStudentValidation , registerStaffValidation  } = require("../Validation/user.validation");


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {}

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {

      //Getting _id for the posting object
      let id = await this.getNewId(body.type);
      console.log(id);
      if(id.Error) return {Status: 500 ,Error: id.Error}
      body._id = id;
      
      //Validating with joi schema by calling validateRegistration function at the end of the page
      let error = await this.validateRegistration(body)
      if (error) return {Status: "400" , Error: error.details[0].message }

      //Check if email already exists
      let emailExist = await this.findEmailExist(body);
      if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email already Exists" }

      //Hashing the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt)
      body.password = hashedPassword;
      
      //Creating the User
      let model = this.getType(body.type);
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.create( body )
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - create(body)"};
    }
  }



/**
   * @description Attempt to get newID for new User
   * @returns {Object}
   */
  async getNewId ( type) {
    try {
      let model = this.getType(type);
      this.MongooseServiceInstance = new MongooseService( model );
      let result = await this.MongooseServiceInstance.findLastId()
      if(!result.Error){
        const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]
        let today = new Date().getFullYear().toString();
        let yearNow = splitAt(2, today);
        let lastId = splitAt(2, result._id)
        if(yearNow[1] === lastId[0]){
          let newId = lastId[0] +''+ ((parseInt(lastId[1]))+1)
          return newId;
        }
        if(Number(yearNow[1]) > Number(lastId[0])){
          let newId = yearNow[1]+'1000';
          return newId;
        }
        else{
          return {Error: 'Invalid Year'}
        }
      }
      return result;
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - getNewId(body)"};
    }
  }

  

  /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' and 'email;' fields to
   * find posts
   * @returns {Object}
   */
  async findEmailExist( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.findOne({email : body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - findEmailExist(body)"};
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
      let model = this.getType(body.type);
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.find();
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
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.findById( body._id);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - findOne(body)"};
    }
  }



  /**
   * @description Attempt to update a post with the provided object
   * @param body {object} Object containing '_id' field and the updated body
   * to update specific post
   * @returns {Object}
   */
  async updateOne( body ) {
    try {

      //Getting Mongoose Instance 
      if(collection == null) { return {status: 400}}
      let model = this.getType(body.type);  
      this.MongooseServiceInstance = new MongooseService( model );

      //Validating with joi schema by calling validateRegistration function at the end of the page
      let error = await this.validateRegistration(body)
      if (error) return {Status: "400" , Error: error.details[0].message }

      //checking if password same
      let user = await this.MongooseServiceInstance.findById(body._id);

      if(body.password != user.password){
        //Hashing the Password if password changed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt)
        body.password = hashedPassword;
      }
      
      //Updating document and returning result
      return await this.MongooseServiceInstance.update(body._id,body);
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - updateOne(body)" };
    }
  }


  /**
   * @description Attempt to update posts with the provided object
   * @param body {object} Object containing query parameter and to be updated 
   * content to update posts that match the query
   * @returns {Object}
   */
  async updateMany( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.updateMany({name: body.name},{email: body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - updateMany(body)"};
    }
  }


  /**
   * @description Attempt to delete a post with the provided object
   * @param body {object} Object containing '_id' field to delete specific post
   * @returns {Object}
   */
  async deleteOne( body ) {
    try {
      let model = this.getType(body.type);     
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.deleteOne({_id: body._id});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - deleteOne(body)"};
    }
  }


  /**
   * @description Attempt to delete posts with the provided object
   * @param body {object} Object containing query parameter and to be updated 
   * content to update posts that match the query
   * @returns {Object}
   */
  async deleteMany( body ) {
    try {
      let model = this.getType(body.type);  
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.deleteMany({email: body.email});
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - deleteMany(body)" };
    }
  }


  
  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async getLecturers( body ) {
    try {
      let model = this.getType(body.type);        
      this.MongooseServiceInstance = new MongooseService( model );
      return await this.MongooseServiceInstance.find( {type: body.type} );
    } 
    catch ( err ) {
      console.log( err)
      return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Service/user.service.js - getLecturers(body)"};
    }
  }



  /**
   * @description Attempt to provide with the required Collection
   * @param type {string} string containing the user type
   * @returns collection to be used with Mongoose Instance
   */
  getType(type){
    let collection;
    if(type === 'staff' || type === 'admin' || type === 'lecturer') {
      collection = FileModel.Staff
    }
    if(type === 'student'){
      collection = FileModel.Student
    }
    collection = null
    return collection
  }

  validateRegistration(body){
    if(body.type === 'staff' || body.type === 'temp-admin' || body.type === 'lecturer') {
      let { error } = registerStaffValidation(body);
      return error
    }
    if(body.type === 'student'){
      let { error } = registerStudentValidation(body);
      return error
    }
  }
}

module.exports = FileService;