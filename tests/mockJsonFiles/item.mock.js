//MockObjects Used for the Customer Testing

const mockObject = {
    "id": "I-121212_Test",
    "item_name": "Test Item Name",
    "vendor": "teststore@gmail.com",
    "description": "Test description of product and its behavior",
    "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg",
    "type": "item_test",
    "meal_type": "starter_test",
    "price": "700",
    "availability": "available"
}


const mockFalseObject = {
    "id": "I-121212_Test",
    "item_name": "Test Item Name",
    "vendor": "teststore@gmail.com",
    "description": "Test",
    "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg",
    "type": "item_test",
    "meal_type": "starter_test",
    "price": "700",
    "availability": "available"
}

const findObject = {
    id: "I-121212_Test",
    item_name: "Test Item Name",
    vendor: "teststore@gmail.com",
    description: "Test description of product and its behavior",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg",
    type: "item_test",
    meal_type: "starter_test",
    price: "700",
    availability: "available"
}


const updateObject = {
    id: "I-121212_Test",
    item_name: "Test Item Name Updated",
    vendor: "teststore@gmail.com",
    description: "Test description of product and its behavior",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg",
    type: "item_test",
    meal_type: "starter_test",
    price: "700",
    availability: "available"
}

const updateFalseObject = {
    id: "I-121212_Test",
    item_name: "Te",
    vendor: "teststore@gmail.com",
    description: "Test description of product and its behavior",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpg",
    type: "item_test",
    meal_type: "starter_test",
    price: "700",
    availability: "available"
}

module.exports = { mockObject , mockFalseObject , findObject , updateObject , updateFalseObject}