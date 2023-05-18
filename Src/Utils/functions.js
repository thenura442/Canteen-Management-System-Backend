class MongooseService {
    /**
     * @description Create an instance of the MongooseService class
     * @param Model {mongoose.model} Mongoose Model to use for the instance
     */
    constructor ( Model ) {
      this.model = Model;
    }

    /*************************************************** Shared Mongoose Functions ********************************************************************/

    /**
     * @description Create a new document on the Model
     * @param pipeline {array} Aggregate pipeline to execute
     * @returns {object} Returns the results of the query
     */
    aggregate ( pipeline ) {
      return this.model
        .aggregate( pipeline );
    }

  
    /**
     * @description Create a new document on the Model
     * @param body {object} Body object to create the new document with
     * @returns {object} Returns the results of the query
     */
    create ( body ) {
      return this.model
        .create(body);
    }



  
    /**
     * @description Count the number of documents matching the query criteria
     * @param query {object} Query to be performed on the Model
     * @returns {object} Returns the results of the query
     */
    count ( query ) {
      return this.model
        .count( query );
    }
  



    /**
     * @description Delete an existing document on the Model
     * @param id {string} ID for the object to delete
     * @returns {object} Returns the results of the query
     */
    deleteOne( id ) {
      return this.model
        .deleteOne( id );
    }



    /**
     * @description Delete existing documents with query on the Model
     * @param query {object} query for the object to delete
     * @returns {object} Returns the results of the query
     */
    deleteMany( query ) {
      return this.model
        .deleteMany( query )
        .select({ __v: 0 }); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }


  
    /**
     * @description Retrieve distinct "fields" which are in the provided status
     * @param query {object} Object that maps to the status to retrieve docs for
     * @param field {string} The distinct field to retrieve
     * @returns {object} Returns the results of the query
     */
    findDistinct ( query, field ) {
      return this.model
        .find( query )
        .distinct( field ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }

 
    /**
     * @description Retrieve a single document from the Model with the provided query
     * @param query {object} Query to be performed on the Model
     * @param {object} [projection] Optional: Fields to return or not return from query
     * @returns {object} Returns the results of the query
     */
    findOne ( query ) {
      
      return this.model
        .findOne( query , {createdAt:0,_id:0, updatedAt:0, __v:0} ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }



    /**
     * @description Retrieve a single document from the Model with the provided query
     * @param query {object} Query to be performed on the Model
     * @param {object} [projection] Optional: Fields to return or not return from query
     * @returns {object} Returns the results of the query
     */
    findOneMerchant ( query ) {
      
      return this.model
        .findOne( query , {createdAt:0,_id:0, updatedAt:0, __v:0} ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }



    /**
     * @description Retrieve a single document matching the provided ID, from the
     *   Model
     * @param id {string} Required: ID for the object to retrieve
     * @param {object} [projection] Optional: Fields to return or not return from
     * query
     * @returns {object} Returns the results of the query
     */
    findById ( id, projection = { __v: 0 }) {
      return this.model
        .findById( id, projection ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }
  


    /**
     * @description Retrieve last Id entered from the Model
     * @returns {object} Returns the results of the query
     */
    findLastId () {
      return this.model
        .findOne({})
        .limit(1)
        .sort({$natural:-1}) //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }


    /**
     * @description Retrieve multiple documents from the Model with the provided query
     * @param query {object} - Query to be performed on the Model
     * @param {object} [projection] Optional: Fields to return or not return from query
     * @returns {object} Returns the results of the query
     */
    find( query, sort ,projection = { __v: 0 }) {
      return this.model
        .find( query , projection ) //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
        .sort(sort);  //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }


  
    /**
     * @description Update a document matching the provided ID, with the body
     * @param id {string} ID for the document to update
     * @param body {object} Body to update the document with
     * @param {object} [options] Optional options to provide query
     * @returns {object} Returns the results of the query
     */
    update ( id, body, options = { lean: true, new: true } ) {
      return this.model
        .findByIdAndUpdate( id, body, options ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }


    /**
     * @description Update a document matching the provided ID, with the body
     * @param id {string} ID for the document to update
     * @param body {object} Body to update the document with
     * @param {object} [options] Optional options to provide query
     * @returns {object} Returns the results of the query
     */
    updateOne ( query, body ) {
      return this.model
        .updateOne( query, body ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }



    /**
     * @description Update documents matching the provided query, with the body
     * @param condition {object} condition for the document to update
     * @param update {object} object to update the documents with
     * @param {object} [options] Optional options to provide query
     * @returns {object} Returns the results of the query
     */
    updateMany ( condition, update, options = { lean: true, new: true } ) {
      return this.model
        .updateMany( condition, update, options ); //CHECK WHAT THIS IS *******************************#####################**********************************************************************************************
    }



    /*************************************************** Shared Functions Across Services and Controllers********************************************************************/
  }
  
  module.exports = MongooseService;