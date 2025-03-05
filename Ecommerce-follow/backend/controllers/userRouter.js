const express = require('express');
const userRouter = express.Router();

const userModel = require('../models/userModel');

const uploadUserImage = require('../middleWare/multer');


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

        const newUser = await userModel.create({ name, email, password });
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
        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }

        if (user.password !== password) {
            return res.status(400).send({ message: "Invalid password" });
        }

        return res.status(200).send({ message: "User logged in successfully", user });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = userRouter;

