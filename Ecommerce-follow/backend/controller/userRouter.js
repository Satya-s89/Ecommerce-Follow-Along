const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { userImage } = require("../middleware/multer");
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

            // Hash password securely
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Handle image upload (if provided)
            const imageUrl = req.file
                ? `http://localhost:8080/uploads/userImages/${req.file.filename}`
                : null;

            // Create user
            const newUser = await userModel.create({
                name,
                email,
                password: hashedPassword,
                image: imageUrl
            });
            const token = jwt.sign(
                { name: newUser.name, email: newUser.email, id: newUser.id },
                process.env.JWT_PASSWORD,
                { expiresIn: '7d' } // Token expires in 7 days
            );

            // Set HTTP-only cookie
            res.cookie("jwt_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // HTTPS only in production
                sameSite: 'none', // Allow cross-site cookies for Vercel deployment
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(201).json({
                message: "User registered successfully",
                token, // Still including token for backward compatibility
                name,
                id: newUser.id
            });
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


userRouter.post("/login", async (req, res) => {
    try {
        console.log("email,password")
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
            console.log("matched");
            const token = jwt.sign({ name:user.name,email:user.email,id:user.id }, process.env.JWT_PASSWORD);
            console.log(token)
            res.cookie("jwt_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // HTTPS only in production
                sameSite: 'none', // Allow cross-site cookies for Vercel deployment
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({ message: "User logged in successfully",token,name:user.name,id:user.id,userImage:user.image});
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }


    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// Logout Route
userRouter.post("/logout", (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/'
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = userRouter;
