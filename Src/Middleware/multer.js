const multer = require('multer');

var store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/Temp');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if(file.mimetype === 'image/png') {
          filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
          filetype = 'jpeg';
        }
        Name = file.originalname.split('.');
        file_name = Name[0].replace(/ /g,"-");
        url = file_name+'--' + Date.now() + '.' + filetype;
        file.filename = url;
        cb(null, url);
      }
  });


// // checking file type
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//   } else {
//       cb(new Error('Not an image! Please upload an image.', 400), false);
//   }
// };
  
const upload = multer({ 
    storage: store,
    limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB
}).single('url')



module.exports.upload = upload;