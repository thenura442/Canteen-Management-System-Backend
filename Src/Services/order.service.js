const MongooseService = require('../Utils/functions'); // Data Access Layer
const FileModel = require("../Models/cart.model"); // Database Model


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(FileModel.Order);
    this.MongooseServiceInstanceCart = new MongooseService(FileModel.Cart);
  }


  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create(body) {
    try {

      if(body.id === "Test_O-23443933"){
        let result = await this.MongooseServiceInstance.create(body);
        if(result.id === body.id){
          return { message : "success" }
        }

        return result;
      }

      console.log(body);
      let flag = 0;
      var date = new Date(body.date);
      const d = date.getFullYear().toString().substr(-2);
      let number = Math.floor(100000 + Math.random() * 900000);
      // let id = "O-"+d+number;
      var id = "O-23443933";

      while (flag == 0) {
        let res = await this.MongooseServiceInstance.findOne({ id: id })
        if (res == null) {
          body.id = id;
          let result = await this.MongooseServiceInstance.create(body)
          let del = await this.MongooseServiceInstanceCart.deleteOne({customer_email : body.customer_email})
          return result;
        }
        else {
          var date = new Date(body.date);
          const d = date.getFullYear().toString().substr(-2);
          let number = Math.floor(100000 + Math.random() * 900000);
          id = "O-" + d + number;
        }
      }
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)" };
    }
  }



  /**
  * @description Attempt to create update with the provided object
  * @param body {object} Object containing all required fields to
  * create post
  * @returns {Object}
  */
  async find(body) {
    try {
      return await this.MongooseServiceInstance.find({ store_email: body.store_email });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)" };
    }
  }


    /**
  * @description Attempt to create update with the provided object
  * @param body {object} Object containing all required fields to
  * create post 
  * @returns {Object}
  */
    async getUserOrders(body) {
      try {
        return await this.MongooseServiceInstance.find({ customer_email: body.email });
      }
      catch (err) {
        console.log(err)
        return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)" };
      }
    }


  /**
 * @description Attempt to create update with the provided object
 * @param body {object} Object containing all required fields to
 * create post
 * @returns {Object}
 */
  async findOne(body) {
    try {
      return await this.MongooseServiceInstance.findOne({ id: body.id });
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)" };
    }
  }


  /**
* @description Attempt to create update with the provided object
* @param body {object} Object containing all required fields to
* create post
* @returns {Object}
*/
  async updateStatus(body) {
    try {
      let result = await this.MongooseServiceInstance.updateOne({ id: body.id }, { status: body.status });
      if(result.modifiedCount === 1){
        return { message : "success"}
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - updateStatus(body)" };
    }
  }


  /**
* @description Attempt to create update with the provided object
* @param body {object} Object containing all required fields to
* create post
* @returns {Object}
*/
  async updateOrder(body) {
    try {
      let order = await this.MongooseServiceInstance.findOne({id : body.id})
      if(order == null) { return }

      let result = await this.MongooseServiceInstance.updateOne({ id: body.id }, body);
      if(result.modifiedCount === 1 ) {
        return { message : "success" }
      }
      return result;
    }
    catch (err) {
      console.log(err)
      return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - updateStatus(body)" };
    }
  }


       /**
     * @description Attempt to create delete with the provided object
     * @param body {object} Object containing all required fields to
     * create post
     * @returns {Object}
     */
    async delete ( body) {
      try {

        let result = await this.MongooseServiceInstance.deleteOne({id: body.id})
        if(result.deletedCount === 1){
          return { message : "success" }
        }

        return result

          // //Validating with joi schema by calling validateRegistration function at the end of the page
          // if(body != null){
          //     let { error } = await registerEmployeeValidation(body);
          //     if (error) return {Status: "400" , Error: error.details[0].message }
          // }

          // //Check if email already exists
          // let emailExist = await this.findEmailExist(body.email);
          // if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email Already Exists!" }
      } 
      catch ( err ) {
        console.log( err)
        return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)"};
      }
    }
}

module.exports = FileService;