const file = require( "../Services/item.service" );
const FileService = new file();

module.exports = { createItem ,getAllItems ,getItem , updateItem , deleteItem , getSearchList};

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createItem ( req, res ) {
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
async function getAllItems ( req, res ) {
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
async function getItem ( req, res ) {
  try {
    const result = await FileService.findOne( req.body);
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
async function getSearchList ( req, res ) {
  try {
    const result = await FileService.getSearchList( req.body);
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
async function updateItem ( req, res ) {
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
async function deleteItem ( req, res ) {
  try {
    const result = await FileService.delete( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


// /**
//  * @description Delete specific user with the type and _id provided by body
//  * @param req {object} Express req object 
//  * @param res {object} Express res object
//  * @returns {object} success or failure object
//  */
// async function getID ( req, res ) {
//   try {
//     const result = await FileService.getNewId( req.body.type);
//     return res.send( result );
//   } catch ( err ) {
//     console.log( err ); 
//     res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
//   }
// }