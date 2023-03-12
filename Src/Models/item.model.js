const mongoose = require("mongoose");

  const ItemSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      description: String,
      type: String,
      portion: String,
      price: String,
      url: String
    },
    { 
      timestamps: true 
    }
  );

const Item = mongoose.model("item", ItemSchema);

module.exports.Item = Item;