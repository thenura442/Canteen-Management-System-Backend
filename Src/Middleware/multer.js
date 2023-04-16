const multer = require('multer');

var store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/Temp');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if(file.mimetype === 'image/png') {
          filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
          filetype = 'jpeg';
        }
        console.log(file);
        Name = file.originalname.split('.');
        file_name = Name[0].replace(/ /g,"-");
        url = file_name+'--' + Date.now() + '.' + filetype;
        file.url = url;
        cb(null, url);
      }
  });
  
const upload = multer({ 
    storage: store,
    limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB
}).single('file')


module.exports.upload = upload;