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

app.get('/',(req,res)=>{
    try{
        res.status(200).send({message:"This is Ecommerce - code - along - Backend"})
    }catch(err){
        res.status(200).send({message: "something went wrong"})
    }
})

app.use("/user",userRouter);
app.use("/products",productRouter);

app.listen(8000,async()=>{
    try{
      await connect();
      console.log('server is connected');
    }catch(err){
    console.log('server is not connected', err);
    }
})

