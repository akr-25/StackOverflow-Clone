// import mongoose from "mongoose";
const mongoose = require("mongoose")
const CommentSchema = require("./Comment");

const AnswerSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Array,
            default: [],
        },
        username: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            min: 20,
            required: true,
        },
        downvotes: {
            type: Array,
            default: [],
        },
        comments: {
            type: [CommentSchema],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);