const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const userModel = require("./models/userModel");
const cartRouter = require("./controller/cartProducts");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow credentials
app.use(cors({
  origin: 'http://localhost:5174', // Update this to match your frontend URL
  credentials: true // Allow cookies to be sent
}));

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

console.log(MONGO_PASSWORD)

const PORT = process.env.PORT || 8080;

// Import routers
const useRouter = require("./controller/userRouter");
const productRouter = require("./controller/productRouter");
const allProductRouter = require("./controller/allProducts");
const addressRouter = require("./controller/addressRouter");
const orderRouter = require("./controller/orderRouter");

// Import middleware
const authMiddleware = require("./middleware/authMiddleware");
const mailer = require("./nodemailer");


app.get("/",(req,res)=>{
    try {
        res.send({message:"This is E-commerce Follow Along Backend"});
    } catch (error) {
        res.status(500).send({error});
    }
})

app.use("/user",useRouter);

// Product routes - protected by auth middleware
app.use("/product", authMiddleware, productRouter);

// Cart routes - protected by auth middleware
app.use("/cart", authMiddleware, cartRouter);

// Address routes - protected by auth middleware
app.use("/address", authMiddleware, addressRouter);


// Order routes - protected by auth middleware
app.use("/order", authMiddleware, orderRouter);

app.use("/allproducts",allProductRouter);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.listen(8080,async ()=>{
    try {
       await mongoose.connect(`mongodb+srv://abhishektiwari136136:${MONGO_PASSWORD}@cluster0.55lt4.mongodb.net/`);
       console.log("Connected sucessfully");
    } catch (error) {
        console.log("Something went wrong not able to connect to server",error);
    }
});



