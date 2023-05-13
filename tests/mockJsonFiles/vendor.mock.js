//MockObjects Used for the Customer Testing

const mockObject = {
    "vendor_name": "Test Food Store",
    "email": "teststore@gmail.com",
    "description": "A variety of Food starting from cheese burgers and other delicacies.",
    "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    "mobile_no": "0723424625",
    "access": "open"
}


const mockFalseObject = {
    "vendor_name": "Test Food Store",
    "email": "teststore@gmail.com",
    "description": "A ",
    "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    "mobile_no": "0723424625",
    "access": "open"
}

const findObject = {
    vendor_name: "Test Food Store",
    email: "teststore@gmail.com",
    description: "A variety of Food starting from cheese burgers and other delicacies.",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    mobile_no: "0723424625",
    access: "open"
}


const updateObject = {
    vendor_name: "Test Food Store Updated",
    email: "teststore@gmail.com",
    description: "A variety of Food starting from cheese burgers and other delicacies.",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    mobile_no: "0723424625",
    access: "open"
}

const updateFalseObject = {
    vendor_name: "Test Food Store",
    email: "teststore@gmail.com",
    description: "A variety of Food starting from cheese burgers and other delicacies.",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    mobile_no: "07",
    access: "open"
}

module.exports = { mockObject , mockFalseObject , findObject , updateObject , updateFalseObject}