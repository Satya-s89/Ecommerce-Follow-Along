const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const allProductRouter = require('./controller/Allproducts');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const PORT = process.env.PORT || 8080;

const useRouter = require("./controller/userRouter");
const productRouter = require("./controller/productRouter");

app.get("/", (req, res) => {
  try {
    res.send({ message: "This is E-commerce Follow Along Backend" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.use("/user", useRouter);

app.use("/product",async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        const user = await userModel.findById(decoded.id);
        
        if (!user && user.id) {
            return res.status(404).json({ message: "Please signup" });
        }
        console.log(user.id)
        req.userId = user.id; 
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Token", error });
    }
},productRouter);

app.use("/allproducts",allProductRouter);

app.use("/upload",express.static(path.join(__dirname,"uploads")));

app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://kakihari03:${MONGO_PASSWORD}@cluster0.qreubmi.mongodb.net/<databaseName>?retryWrites=true&w=majority`
    );
    console.log("Connected successfully to MongoDB Atlas");
  } catch (error) {
    console.log("Something went wrong; not able to connect to the server", error);
  }
});