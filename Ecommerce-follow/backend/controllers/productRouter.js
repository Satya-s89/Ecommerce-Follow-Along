const express = require("express");
const productRouter = express.Router();
const productModel = require("../models/productModel");
const productImages = require("../middleWare/multer");
const jwt = require('jsonwebtoken');

productRouter.post("/addproduct",async(req,res,next)=>{
    productImages.array("images",6)(req,res,(err)=>{
        if(err){
            return res.status(500).send({msg:"Something went wrong while uploading images"});
        }
    })

},async(req,res)=>{
    try {
        const {title,description,price} = req.body;
        const auth = req.headers.authorization;
        const decoded = jwt.verify(auth ,process.env.JWT_PASSWORD);
        if(!title || !description || !price){
            return res.status(404).send({msg:"Please fill all fields"});
        }

        const images = req.files;
        const imageLinkArray = [];
        images.forEach((ele)=>{
            imageLinkArray.push(`http://localhost:8000/uploads/images`);
        })

        return res.status(200).send({msg:"Product added sucessfully"});

    } catch (error) {
        return res.status(500).send({msg:"Something went wrong",error});
    }
})

module.exports = productRouter;
