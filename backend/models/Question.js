// import mongoose from "mongoose";
const mongoose = require("mongoose")
const CommentSchema = require("./Comment")

const QuestionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            min: 20,
            required: true,
        },
        username: {
            type: String, 
            required: true,
        },
        // images:{
        //     type:Array, 
        //     default:[],
        // },
        comments: [CommentSchema],
        // default: CommentSchema.new(),
        answers: {
            type: Array,
            default: [],
        },
        upvotes: {
            type: Array,
            default: [],
        },
        downvotes: {
            type: Array,
            default: [],
        },
        tags: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);
const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = QuestionModel;