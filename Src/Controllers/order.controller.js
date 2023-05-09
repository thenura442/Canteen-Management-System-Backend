const file = require( "../Services/order.service" );
const FileService = new file();

module.exports = { createOrder , getOrder, getOrderId , updateStatus , updateOrder , getUserOrders};

/**
 * @description Create a record with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function createOrder ( req, res ) {
  try {
    const result = await FileService.create( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Create a record with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function getOrder ( req, res ) {
  try {
    const result = await FileService.find( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Create a record with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function getUserOrders ( req, res ) {
  try {
    const result = await FileService.getUserOrders( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Create a record with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function getOrderId ( req, res ) {
  try {
    const result = await FileService.findOne( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Create update cart with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function updateOrder ( req, res ) {
  try {
    const result = await FileService.updateOrder( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}



/**
 * @description Create update cart with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns status success or failure
 */
async function updateStatus ( req, res ) {
  try {
    const result = await FileService.updateStatus( req.body);
    return res.send( result );
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}




// /**
//  * @description Create a record with the provided body
//  * @param req {object} Express req object 
//  * @param res {object} Express res object
//  * @returns status success or failure
//  */
// async function deleteCart ( req, res ) {
//   try {
//     const result = await FileService.delete( req.body);
//     return res.send( result );
//   } catch ( err ) {
//     console.log( err ); 
//     res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
//   }
// }



// /**
//  * @description Create a record with the provided body
//  * @param req {object} Express req object 
//  * @param res {object} Express res object
//  * @returns status success or failure
//  */
// async function deleteItem ( req, res ) {
//   try {
//     const result = await FileService.deleteItem( req.body);
//     return res.send( result );
//   } catch ( err ) {
//     console.log( err ); 
//     res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
//   }
// }
  