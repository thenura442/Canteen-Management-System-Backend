//MockObjects Used for the Order Testing

const mockObject = {
    "id": "Test_O-23443933",
    "customer_email": "tester122@gmail.com",
    "customer_name": "Tester",
    "store_name": "Test Food Store",
    "store_url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    "store_email": "teststore@gmail.com",
    "sub_total": "1200",
    "payment_type": "cash",
    "discount": "0",
    "total": "1200",
    "date": "04/28/2023",
    "time": "1:19:35",
    "status": "pending",
    "products": [
        {
            "id": "I-AA35540",
            "item_name": "Test Item",
            "price": "400",
            "quantity": "3",
            "url": "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
            "product_total": "1200"
        }
    ]
}

const findObject = {
    id: "Test_O-23443933",
    customer_email: "tester122@gmail.com",
    customer_name: "Tester",
    store_name: "Test Food Store",
    store_url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    store_email: "teststore@gmail.com",
    sub_total: "1200",
    payment_type: "cash",
    discount: "0",
    total: "1200",
    date: "04/28/2023",
    time: "1:19:35",
    status: "pending",
    products: [
        {
            id: "I-AA35540",
            item_name: "Test Item",
            price: "400",
            quantity: "3",
            url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
            product_total: "1200"
        }
    ]
}


const updateObject = {
    id: "Test_O-23443933",
    customer_email: "tester122@gmail.com",
    customer_name: "Tester",
    store_name: "Test Food Store",
    store_url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png",
    store_email: "teststore@gmail.com",
    sub_total: "1600",
    payment_type: "cash",
    discount: "0",
    total: "1600",
    date: "04/28/2023",
    time: "1:19:35",
    status: "pending",
    products: [
        {
            id: "I-AA35540",
            item_name: "Test Item Updated",
            price: "400",
            quantity: "4",
            url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_pic.jpeg",
            product_total: "1200"
        }
    ]
}

module.exports = { mockObject  , findObject , updateObject }