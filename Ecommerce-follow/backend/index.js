const express = require('express');
const app = express();
app.use(express.json());

const connect = require('connect');
const userRouter = require('./controllers/userRouter');
const productRouter = require("./controllers/productRouter");
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');
app.use('cors');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel');

app.get('/',(req,res)=>{
    try{
        res.status(200).send({message:"This is Ecommerce - code - along - Backend"})
    }catch(err){
        res.status(200).send({message: "something went wrong"})
    }
})

app.use("/user",userRouter);
app.use("/products",async(req,res,next) => {
    try {
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(401).send({msg:"Please Login"});
        }

        const decoded = jwt.verify(auth ,process.env.JWT_PASSWORD);
        const user = await userModel.findOne({_id:decoded.id});
        if(!user){
            return res.status(401).send({msg:"Please signup"});
        }
        
        console.log(decoded);
        next();
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"},error);
    }
},productRouter);

app.listen(8000,async()=>{
    try{
      await connect();
      console.log('server is connected');
    }catch(err){
    console.log('server is not connected', err);
    }
})

