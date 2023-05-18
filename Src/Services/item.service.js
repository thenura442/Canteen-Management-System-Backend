// services/PostService.js
const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModel = require("../Models/item.model"); // Database Model
const { registerItemValidation } = require("../Validation/item.validation");
const aws = require('../Middleware/aws-bucket');
const fs = require('fs');


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
      if(body.id !== "I-121212_Test"){
        const id = await this.getNewId(body.type);
        body.id = id;
      }
      

      if (body != null) {
        let { error } = registerItemValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      if( body.url != "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg"){
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
      if(result.id === body.id){
        return { message : "success"}
      }
      return result;
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
      console.log(body);
      let result = await this.MongooseServiceInstance.find({vendor: body.email, availability: "available"});
      if (result == null) { return { status: 400 } }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/item.service.js - find(body)" };
    }
  }



    /**
   * @description Attempt to find posts with the provided object
   * @param body {object} Object containing 'type' field to
   * find posts
   * @returns {Object}
   */
    async getAllVendor(body) {
      try {
        console.log(body);
        let result = await this.MongooseServiceInstance.find({vendor: body.email});
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
   * @description Attempt to find a post with the provided object
   * @param body {object} Object containing '_id' field to
   * find specific post
   * @returns {Object}
   */
    async getSearchList(body) {
      try {
        let items = await this.MongooseServiceInstance.find();
        if (items == null || body.search == null) { return { status: 400 } }
        return items.filter((items) => items.item_name.toLocaleLowerCase().includes(body.search.toLocaleLowerCase()));
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
      if (body != null) {
        let { error } = registerItemValidation(body);
        if (error) return { Status: "400", Error: error.details[0].message }
      }

      //Check if image is the same
      let imageExist = await this.findOne({ id: body.id });
      if (imageExist != null && imageExist.url === body.url) {
        let result = await this.MongooseServiceInstance.updateOne({ id: body.id }, body);
        if(result.modifiedCount === 1){
          return { message : "success"}
        }
        return result;
      }

      if (imageExist != null && imageExist.url != body.url) {

        if(body.url != "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg"){
          await aws.deletefile(imageExist.url);

          let aws_url = await aws.uploadfile(body.url)


          fs.unlink(body.url, (err) => {
            if (err) {
              throw err;
            }
          });


          body.url = aws_url.Location;
        }
        
        let result = await this.MongooseServiceInstance.updateOne({ id: body.id }, body);
        if(result.modifiedCount === 1){
          return { message : "success"}
        }
        return result;
      }
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
      if( body.url != "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg"){
        await aws.deletefile(body.url);
      }
      
      let result = await this.MongooseServiceInstance.deleteOne({ id: body.id });
      if(result.deletedCount === 1){
        return { message : "success" }
      }
      return result;
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