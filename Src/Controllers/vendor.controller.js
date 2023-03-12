const file = require( "../Services/vendor.service" );
const FileService = new file();

module.exports = { createVendor ,getAllVendors ,findOne , updateOne , deleteOne };

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createVendor ( req, res ) {
  try {
    const result = await FileService.create( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Get all Users with the type provided by body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function getAllVendors ( req, res ) {
  try {
    const result = await FileService.find( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Get specific User with the type and _id provided by body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function findOne ( req, res ) {
  try {
    const result = await FileService.findOne( req.body);
    console.log(result);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Update specific User with the type and _id provided by body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function updateOne ( req, res ) {
  try {
    const result = await FileService.update( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Delete specific user with the type and _id provided by body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function deleteOne ( req, res ) {
  try {
    const result = await FileService.delete( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}