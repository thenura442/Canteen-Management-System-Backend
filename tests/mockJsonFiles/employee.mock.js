//MockObjects Used for the Employee Testing

const mockObject = {
    "first_name" : "Tester",
    "last_name" : "Ender",
    "nic" : "200308300020",
    "dob" : "03/23/2003",
    "email" : "tester122@gmail.com",
    "mobile_no" : "0783323261",
    "address" : "272/10c-1,Subhamawatha,Nugegoda",
    "access" : "open",
    "type" : "owner",
    "vendor" : "teststore@gmail.com",
    "url" : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png",
    "password" : "tester123"
}


const mockFalseObject = {
    "first_name" : "Tester",
    "last_name" : "Ender",
    "nic" : "200308300020",
    "dob" : "03/23/2003",
    "email" : "tester122",
    "mobile_no" : "0783323261",
    "address" : "272/10c-1,Subhamawatha,Nugegoda",
    "access" : "open",
    "type" : "owner",
    "vendor" : "teststore@gmail.com",
    "url" : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png",
    "password" : "tester123"
}


const mockLoginObject = {
    email : "tester122@gmail.com",
    password : "tester123",
    type : "staff"
}


const mockFalseLoginObject = {
    email : "tester122@gmail.com",
    password : "tester12333",
    type : "staff"
}

const findObject = {
    first_name : "Tester",
    last_name : "Ender",
    nic : "200308300020",
    dob : "03/23/2003",
    email : "tester122@gmail.com",
    mobile_no : "0783323261",
    address : "272/10c-1,Subhamawatha,Nugegoda",
    access : "open",
    type : "owner",
    vendor : "teststore@gmail.com",
    url : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png",
}


const updateObject = {
    first_name : "Tester_Updated",
    last_name : "Ender_Updated",
    nic : "200308300020",
    dob : "03/23/2003",
    email : "tester122@gmail.com",
    mobile_no : "0783323261",
    address : "272/10c-1,Subhamawatha,Nugegoda",
    access : "open",
    type : "owner",
    vendor : "teststore@gmail.com",
    url : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png"
}

const updateFalseObject = {
    first_name : "Tester_Updated",
    last_name : "Ender_Updated",
    nic : "200308300020",
    dob : "03/23/2003",
    email : "tester122@gmail.com",
    mobile_no : "07833",
    address : "272/10c-1,Subhamawatha,Nugegoda",
    access : "open",
    type : "owner",
    vendor : "teststore@gmail.com",
    url : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png"
}

module.exports = { mockLoginObject , mockFalseLoginObject, mockObject , mockFalseObject , findObject , updateObject , updateFalseObject}