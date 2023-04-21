const config = require( '../Config/config')

module.exports = { createUpload , updateUpload};


/**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function createUpload ( req, res ) {
  try {
    return res.send({Status: 200, path : req.file.path});
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}


/**
 * @description Create upload files url
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function updateUpload ( req, res ) {
    try {
      let url = config.url+'/Files/'+req.file.filename;
      return res.send( {"result": url} );
    } catch ( err ) {
      console.log( err ); 
      res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
    }
  }