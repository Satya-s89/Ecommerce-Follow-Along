const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { userImage } = require("../middleWare/multer");
const jwt = require('jsonwebtoken');


const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
    try {

        userImage.single("image")(req, res, async (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: "File upload error", error: err.message });
            }

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All details are required" });
            }

            const userExists = await userModel.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "User Already Registered" });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const imageUrl = req.file 
                ? `http://localhost:8080/uploads/userImages/${req.file.filename}`
                : null;

            const newUser = await userModel.create({ 
                name, 
                email, 
                password: hashedPassword, 
                image: imageUrl 
            });

            const token = jwt.sign({ name: newUser.name,email: newUser.email,id: newUser.id }, process.env.JWT_PASSWORD); 
            return res.status(201).json({ message: "User registered successfully", token: token, name, id:newUser.id});
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All details are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const matchedPass = bcrypt.compareSync(password, user.password);

        if (matchedPass) {
            const token = jwt.sign({ name: user.name,email: user.email,id: user.id }, process.env.JWT_PASSWORD); 
            return res.status(200).json({ message: "User logged in successfully" },token);
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }

               

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = userRouter;