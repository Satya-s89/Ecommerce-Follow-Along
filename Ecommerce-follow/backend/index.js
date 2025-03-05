const express = require('express');
const app = express();
const connect = require('connect');
const userRouter = require('./controllers/userRouter');

app.get('/',(req,res)=>{
    try{
        res.status(200).send({message:"This is Ecommerce - code - along - Backend"})
    }catch(err){
        res.status(200).send({message: "something went wrong"})
    }
})

app.use("/user",userRouter);

app.listen(8000,async()=>{
    try{
      await connect();
      console.log('server is connected');
    }catch(err){
    console.log('server is not connected', err);
    }
})

