// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import {Router as router} from "express";
const bcrypt = require("bcrypt")
const User = require("../models/User")
const router = require("express").Router()

//REGISTER
router.post("/register", async (req, res) => {
    try {
        //generate new password
        if(req.body.password.length < 6 ) throw("Password length should be atleast 6 characters");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(newUser)

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            res.status(404).send("user not found");
            return;
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            res.status(400).send("wrong password");
            return;
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router;
