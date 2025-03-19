const express = require("express");
const productRouter = express.Router();
const productModel = require("../models/productModel")
const productImages = require('../middleWare/multer')

productRouter.post("/addproducts",async(req,res,next)=>{
    productImages.array("images",6)(req,res,(err) => {
        if(err){
            return res.status(500).send({msg:"Something Went Wrong While uploading images"});
        }

        const images = req.files;
        
    })
},async(req,res) => {
    try {
        const {title,description,price} = req.body;
        if(!title || !description || !price){
            return res.status(404).send({msg:"Please add all fields"});
        }
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Error"});
    }
})