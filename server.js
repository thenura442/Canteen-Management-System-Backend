const express = require('express');
const cors = require('cors');

const app = express();

//Requiring the model.js that will connect to the DB with constructor
require('./Src/Models/model');

//Defining required configuration and variables
let config = require('./Src/Config/config');
let route = require('./Src/Routing/route')
let port = config.port
let url = config.url
let name = config.name


//Cors(cross origin request) options are set here
const corsOptions={
    credentials: true, 
    origin:"*",
    //
    //credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/Public",express.static('Public/Temp'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route)

//Default Loading for the Server    
app.use('/', (req, res) => {
    res.send({ 
        status: 200,
        message: 'Server Loaded Successfully',
        Description: name+' RestAPI For a MEAN Application Project',
        Port: port,
        BaseUrl: url+port
    });
})

app.listen(port, function(){
    console.log(`listening on port ${port}`);
})

module.exports = app;