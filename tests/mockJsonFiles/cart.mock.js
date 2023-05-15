//MockObjects Used for the Customer Testing

const mockObject = {
    "customer_email": "tester122@gmail.com",
    "store_email": "teststore@gmail.com",
    "sub_total": "2400",
    "products": [
    {
        "id": "I-AA35540",
        "item_name": "test_item_1",
        "price": "400",
        "quantity": "3",
        "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        "product_total": "1200"
    },
    {
        "id": "I-AA81881",
        "item_name": "test_item_2",
        "price": "600",
        "quantity": "2",
        "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        "product_total": "1200"
    }]
}

const findObject = {
    customer_email: "tester122@gmail.com",
    store_email: "teststore@gmail.com",
    sub_total: "2400",
    products: [
    {
        id: "I-AA35540",
        item_name: "test_item_1",
        price: "400",
        quantity: "3",
        url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        product_total: "1200"
    },
    {
        id: "I-AA81881",
        item_name: "test_item_2",
        price: "600",
        quantity: "2",
        url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        product_total: "1200"
    }]
}


const updateObject = {
    customer_email: "tester122@gmail.com",
    store_email: "teststore@gmail.com",
    sub_total: "2800",
    products: [
    {
        id: "I-AA35540",
        item_name: "test_item_1",
        price: "400",
        quantity: "4",
        url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        product_total: "1600"
    },
    {
        id: "I-AA81881",
        item_name: "test_item_2",
        price: "600",
        quantity: "2",
        url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
        product_total: "1200"
    }]
}

module.exports = { mockObject  , findObject , updateObject }