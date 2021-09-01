// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import {Router as router} from "express";
const bcrypt = require("bcrypt")
const User = require("../models/User")
const router = require("express").Router()

// get a list of all user
router.get("/all", async (req, res) => {
    try {
        var users = await User.find();
        for (user of users) {
            user["password"] = undefined;
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
})

//bookmark a question
router.put("/bookmark", async (req, res) => {
    try {
        var user = await User.findById(req.body.userId);
        if (!user["bookmarks"].includes(req.body.questionId)) {
            var doc = await User.findByIdAndUpdate(req.body.userId, {
                $push: { "bookmarks": req.body.questionId },
            })
            res.status(200).send(doc);
        }
        else {
            var doc = await User.findByIdAndUpdate(req.body.userId, {
                $pull: { "bookmarks": req.body.questionId },
            })
            res.status(200).send(doc)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

//search a user 
router.put("/search", async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $search: {
                    'index': 'user',
                    'text': {
                        'query': req.body.query,
                        'path': {
                            'wildcard': '*'
                        }
                    }
                },
                $search: {
                    "index": 'user',
                    "autocomplete": {
                        "query": req.body.query,
                        "path": "username",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        },
                    },
                },
            },
        ])
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err)
    }
});

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    // console.log(req.params.id);
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    // console.log(username);
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        if (user === null) throw ("User does not exist");
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
