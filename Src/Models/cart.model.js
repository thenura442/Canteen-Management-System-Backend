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


  const CartSchema = new mongoose.Schema(
    {
      customer_email: String,
      store_email: String,
      store_name: String,
      store_url: String,
      sub_total: String,
      item_count: String,
      categories: String,
      store_name: String,
      products: [ProductSchema],
    },
    { 
      timestamps: true 
    }
  );

const Cart = mongoose.model("cart", CartSchema);

module.exports.Cart = Cart;