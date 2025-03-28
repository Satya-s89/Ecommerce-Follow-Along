const express = require('express');
const allProductRouter = express.Router();
const productModel = require('../models/productModel');

allProductRouter.get('/',async(req,res) => {
    try {
        const products = await productModel.find();
        return res.status(200).send({msg:"Successfull",products});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong"});
    }
});

allProductRouter.get("/:id",async(req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).send({msg:"Please Provide ID"});
        }
        const product = await productModel.findOne(id);
        return res.status(200).send({msg:"Successfull",product:product});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong"});
    }
})

modules.exports = allProductRouter