const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

//read 10 products from the bookdata.csv file and add them to the database
const fs = require("fs");
const path = require("path");
const filePath = path.join(
  __dirname,
  "..",
  "..",
  "Data",
  "bookdata.csv"
);



module.exports = mongoose.model("Product", ProductSchema);


