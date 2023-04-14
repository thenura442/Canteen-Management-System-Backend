// services/PostService.js
const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModel = require("../Models/item.model"); // Database Model
const { registerItemValidation } = require("../Validation/item.validation");


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(FileModel.Item);
  }


  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create(body) {
    try {

      //Get New ID for Item Based on Type
      const id = await this.getNewId(body.type);
      body.id = id;

      if (body != null) {
        let { error } = registerItemValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      return await this.MongooseServiceInstance.create(body)
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - create(body)" };
    }
  }



  /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' field to
   * find posts
   * @returns {Object}
   */
  async find(body) {
    try {
      let result = await this.MongooseServiceInstance.find();
      if (result == null) { return { status: 400 } }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - find(body)" };
    }
  }



  /**
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
  async findOne(body) {
    try {
      let result = await this.MongooseServiceInstance.findOne({id: body.id});
      if (result == null) { return { status: 400 } }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - findSubject(body)" };
    }
  }


  /**
   * @description Attempt to find a update with the provided object
   * @param body {object} Object containing '_id' field to
   * update specific post
   * @returns {Object}
   */
  async update(body) {
    try {
      return await this.MongooseServiceInstance.updateOne({id:body.id}, body);
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - updateSubject(body)" };
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
      return await this.MongooseServiceInstance.deleteOne({ id: body.id });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - deleteSubject(body)" };
    }
  }



  /**
   * @description Attempt to get newID for new User
   * @returns {Object}
   */
  async getNewId(type) {
    try {

      console.log(type);
      let result = '';
      let res;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const charactersLength = '2';
      let counter = 0;
      while (counter < '2') {
        result += characters.charAt(Math.floor(Math.random() * '2'));
        counter += 1;
      }

      const val = Math.floor(Math.random() * 90000) + 10000;
      const item = "I-"+result+val;
      const special = "SI-"+result+val;

      if(type=="item"){
        let flag = 0;
        console.log(flag)
        while(flag == 0){
          res = await this.MongooseServiceInstance.findOne({id:item})
          console.log(res);
          if(res == null){
            flag = 1;
          }
        }

        return item;
      }

      if(type=="special"){
        let flag = 0;
        console.log(flag)
        while(flag == 0){
          res = await this.MongooseServiceInstance.findOne({id:special})
          console.log(res);
          if(res == null){
            flag = 1;
          }
        }

        return special;
      }
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/item.service.js - getNewId(body)" };
    }
  }

}


module.exports = FileService;