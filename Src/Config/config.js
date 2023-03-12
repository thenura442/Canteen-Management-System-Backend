// configuration file
const dotenv = require('dotenv');

dotenv.config();

//Defining the Configurations using .env file and defining some options if incase the .env file is not defined or throws an error

const config = {
    dbUrl: process.env.DB_CONNECTION || "mongodb+srv://Admin:admin123@cms.zx94qdf.mongodb.net/?retryWrites=true&w=majority",
    port: process.env.PORT || 5000,
    env: process.env.APP_ENV || "development",
    name: process.env.APP_NAME || "DLE Backend Server",
    url: process.env.APP_URL || "http://localhost:5000",
    logDir: process.env.LOG_DIR || "Logs"
  };
  
  module.exports = config;