const mongoose = require("mongoose");

  const ItemSchema = new mongoose.Schema(
    {
      id: String,
      item_name: String,
      vendor: String,
      description: String,
      url: String,
      type: String,
      portion: String,
      price: String,
      availability: String
    },
    { 
      timestamps: true 
    }
  );

const Item = mongoose.model("item", ItemSchema);

module.exports.Item = Item;