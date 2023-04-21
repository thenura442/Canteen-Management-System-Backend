require('dotenv').config();
const S3 = require('aws-sdk/clients/s3'); 
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadfile(url){

    const filePath = url;

    const fileStream = fs.createReadStream(filePath)
    
    const filename = path.basename(filePath)
    
    const mimeType = mime.lookup(filePath);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename,
        ContentType: mimeType
    }

    return s3.upload(uploadParams).promise()
}


function deletefile(url){

    const filePath = url;    
    const filename = path.basename(filePath)

    s3.deleteObject({
        Bucket: bucketName,
        Key: filename
    },function (err,data){})
}


module.exports.uploadfile = uploadfile;
module.exports.deletefile = deletefile;