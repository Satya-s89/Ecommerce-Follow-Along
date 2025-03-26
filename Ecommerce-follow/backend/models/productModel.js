const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        require: true,
        type: String,
        trim: true
    },
    description: {
        require: true,
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },   
});

const productModel = mongoose.model("Products",schema);

module.exports = productModel;