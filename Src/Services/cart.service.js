const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/cart.model" ); // Database Model


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel.Cart );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {

      //Checking if Cart of the user already exists
      let cart = await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});
      if(cart == null) {
        let result = await this.MongooseServiceInstance.create( body )
        if(result.customer_email === body.customer_email) {
          return { message : "success" }
        }
      }

      cart.products.push(body.products[0])

      let sub_tot = Number(cart.sub_total) + Number(body.products[0].product_total);
      cart.sub_total = sub_tot.toString();

      await this.MongooseServiceInstance.updateOne({customer_email: body.customer_email},cart)  

      let result = await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});
      if(result.customer_email === body.customer_email) {
        return { message : "success" }
      }

      return result;

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



   /**
   * @description Attempt to create update with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
   async find ( body) {
    try {
      return await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});

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




  /**
   * @description Attempt to create update with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async update ( body) {
    try {

      await this.MongooseServiceInstance.updateOne({customer_email: body.customer_email},body)

      return await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});

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

  

   /**
   * @description Attempt to create delete with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async delete ( body) {
    try {

      let result = await this.MongooseServiceInstance.deleteOne({customer_email: body.customer_email})
      if(result.deletedCount === 1){
        return { message : "success"}
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




    /**
   * @description Attempt to delete Cart item with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
    async deleteItem ( body) {
      try {
        //Checking if Cart of the user already exists
        let cart = await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});
        if(cart == null) {
          return null;
        }

        let sub_tot = cart.sub_total;
        for (let i = 0; i < cart.products.length; i++) {
          if(cart.products[i].id == body.id){
            sub_tot = Number(cart.sub_total) - Number(cart.products[i].product_total)
            cart.sub_total = sub_tot.toString();
            cart.products.splice(i, 1);
          }
        }

        // const index = cart.products.indexOf(body.id);
        // console.log(index)

      
        // const x = cart.products.splice(index, 1);
        // console.log(x);

        if(cart.products.length == 0 ){
          let result = await this.MongooseServiceInstance.deleteOne({customer_email: body.customer_email});
          if(result.deletedCount === 1){
            return { message : "success" }
          }
        }

        let result = await this.MongooseServiceInstance.updateOne({customer_email: body.customer_email},cart) 
        if(result.modifiedCount === 1) {
          return { message : "success"}
        }
  
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
            return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - findEmailExist(email)"};
        }
      }
}

module.exports = FileService;