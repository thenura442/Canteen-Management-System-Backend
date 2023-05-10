const mongoose = require("mongoose");

    const ProductSchema = new mongoose.Schema(
        {
        id: String,
        item_name: String,
        price: String,
        quantity: String,
        url: String,
        product_total: String
        },
        { 
        timestamps: true 
        }
    );

    const OrderSchema = new mongoose.Schema(
      {
        id: String,
        customer_email: String,
        customer_name: String,
        store_name : String,
        store_url : String,
        store_email: String,
        sub_total: String,
        payment_type: String,
        discount: String,
        total: String,
        date: String ,
        time: String ,
        status: String,
        rejected_reasons: String,
        products: [ProductSchema]
      },
      { 
      timestamps: true 
      }
  );


  const CartSchema = new mongoose.Schema(
    {
      customer_email: String,
      store_email: String,
      sub_total: String,
      item_count: String,
      categories: String,
      products: [ProductSchema],
    },
    { 
      timestamps: true 
    }
  );

const Cart = mongoose.model("cart", CartSchema);
const Order = mongoose.model("order", OrderSchema);

module.exports.Cart = Cart;
module.exports.Order = Order;