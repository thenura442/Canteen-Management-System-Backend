const MongooseService = require( '../Utils/functions' ); // Data Access Layer
const FileModel = require( "../Models/cart.model" ); // Database Model


class FileService {
  /**
   * @description Create an instance of PostService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( FileModel.Order );
  }

  
  /**
   * @description Attempt to create a post with the provided object
   * @param body {object} Object containing all required fields to
   * create post
   * @returns {Object}
   */
  async create ( body) {
    try {

        console.log(body);
        let flag = 0;
        var date = new Date(body.date);
        const d = date.getFullYear().toString().substr(-2);
        let number = Math.floor(100000 + Math.random() * 900000);
        // let id = "O-"+d+number;
        var id = "O-23443933";

        while(flag == 0){
          let res = await this.MongooseServiceInstance.findOne({id:id})
          if(res == null){
            body.id = id;
            return await this.MongooseServiceInstance.create( body )
          }
          else {
            var date = new Date(body.date);
            const d = date.getFullYear().toString().substr(-2);
            let number = Math.floor(100000 + Math.random() * 900000);
            id = "O-"+d+number;
          }
        }
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
      return await this.MongooseServiceInstance.find({store_email : body.store_email});
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
    async findOne ( body) {
      try {
        return await this.MongooseServiceInstance.findOne({id : body.id});
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
        async updateStatus ( body) {
          try {
            console.log(body)
            return await this.MongooseServiceInstance.updateOne({id : body.id}, {status : body.status});
          } 
          catch ( err ) {
            console.log( err)
            return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - updateStatus(body)"};
          }
        }




//   /**
//    * @description Attempt to create update with the provided object
//    * @param body {object} Object containing all required fields to
//    * create post
//    * @returns {Object}
//    */
//   async update ( body) {
//     try {

//       await this.MongooseServiceInstance.updateOne({customer_email: body.customer_email},body)

//       return await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});

//         // //Validating with joi schema by calling validateRegistration function at the end of the page
//         // if(body != null){
//         //     let { error } = await registerEmployeeValidation(body);
//         //     if (error) return {Status: "400" , Error: error.details[0].message }
//         // }

//         // //Check if email already exists
//         // let emailExist = await this.findEmailExist(body.email);
//         // if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email Already Exists!" }
//     } 
//     catch ( err ) {
//       console.log( err)
//       return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)"};
//     }
//   }

  

//    /**
//    * @description Attempt to create delete with the provided object
//    * @param body {object} Object containing all required fields to
//    * create post
//    * @returns {Object}
//    */
//   async delete ( body) {
//     try {

//       return await this.MongooseServiceInstance.deleteOne({customer_email: body.customer_email})

//         // //Validating with joi schema by calling validateRegistration function at the end of the page
//         // if(body != null){
//         //     let { error } = await registerEmployeeValidation(body);
//         //     if (error) return {Status: "400" , Error: error.details[0].message }
//         // }

//         // //Check if email already exists
//         // let emailExist = await this.findEmailExist(body.email);
//         // if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email Already Exists!" }
//     } 
//     catch ( err ) {
//       console.log( err)
//       return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)"};
//     }
//   }




//     /**
//    * @description Attempt to delete Cart item with the provided object
//    * @param body {object} Object containing all required fields to
//    * create post
//    * @returns {Object}
//    */
//     async deleteItem ( body) {
//       try {
  
//         //Checking if Cart of the user already exists
//         let cart = await this.MongooseServiceInstance.findOne({customer_email: body.customer_email});
//         if(cart == null) {
//           return null;
//         }

//         console.log(Number(cart.sub_total ) - Number(cart.products[1].product_total))

//         let sub_tot = 0;
//         for (let i = 0; i < cart.products.length; i++) {
//           console.log(cart.products[i].id +'-'+ body.id)
//           if(cart.products[i].id == body.id){
//             console.log(cart.products[i].id)
//             sub_tot = Number(cart.sub_total) - Number(cart.products[i].product_total)
//             cart.sub_total = sub_tot.toString();
//           }
//         }

//         const index = cart.products.indexOf({id: body.id});

      
//         const x = cart.products.splice(index, 1);

//         if(cart.products.length == 0 ){
//           return await this.MongooseServiceInstance.deleteOne({customer_email: body.customer_email});
//         }

//         return await this.MongooseServiceInstance.updateOne({customer_email: body.customer_email},cart) 
  
//           // //Validating with joi schema by calling validateRegistration function at the end of the page
//           // if(body != null){
//           //     let { error } = await registerEmployeeValidation(body);
//           //     if (error) return {Status: "400" , Error: error.details[0].message }
//           // }
  
//           // //Check if email already exists
//           // let emailExist = await this.findEmailExist(body.email);
//           // if(emailExist) return  {Status: "400" , Email : emailExist.email, Error: "Email Already Exists!" }
//       } 
//       catch ( err ) {
//         console.log( err)
//         return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - create(body)"};
//       }
//     }
  



//     /**
//    * @description Attempt to find if provided email exists in database
//    * @param email {object} Object containing 'email' field to
//    * find post
//    * @returns {Object}
//    */
//     async findEmailExist( email ) {
//         try {
//             return await this.MongooseServiceInstance.findOne({email : email});
//         } 
//         catch ( err ) {
//             console.log( err)
//             return { Status: 500 , Error : `${err.name} : ${err.message} `, Location: "./Src/Services/employee.service.js - findEmailExist(email)"};
//         }
//       }
}

module.exports = FileService;