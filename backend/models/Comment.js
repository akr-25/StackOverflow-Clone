// import mongoose from "mongoose";
const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Array,
            default: [],
        },
        // isQuestion: {
        //     type:Boolean,
        //     required: true,
        // },
        // ref: { // reference to the question id or the answer id
        //     type: String,
        //     required: true,
        // },
        // repliedTo:{
        //     type:String,
        // },
        // downvotes: {
        //     type: Array,
        //     default: [],
        // },
    },
    { timestamps: true }
);

module.exports = CommentSchema;
// module.exports = mongoose.model("Comment", CommentSchema);