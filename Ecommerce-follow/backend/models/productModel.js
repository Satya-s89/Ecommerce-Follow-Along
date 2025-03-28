const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true } 
}, { timestamps: true }); 

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
