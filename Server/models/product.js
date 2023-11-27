const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  model: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  image: String,
});

module.exports = mongoose.model("DBProducts", productSchema);
