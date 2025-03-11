const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const uploadUserImage = require('../middleWare/multer');

const bcrypt = require('bcrypt');


userRouter.post('/signup', uploadUserImage.single("userImage"), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const newUser = await userModel.insertOne({ name, email, password:hash});
        return res.status(200).send({ message: "User registered successfully", user: newUser });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        const matchedPass = bcrypt.compareSync(password, hash); 

        if(user && matchedPass){
            return res.status(200).send({ message: "User logged in successfully"});
        }
        
        return res.status(401).send({ message: "Entered details are wrong"});

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = userRouter;

