const User = require("../models/User");
const Answer = require("../models/Answer");
const { AddAnswertoQues } = require("./answer_ques");

exports.PostAnswer = async (req, res) => {
    try {
        const user = await User.exists({ _id: req.body.userId });
        if (!user) throw ("User doesn't exist");
        const newAnswer = new Answer({
            userId: req.body.userId,
            question: req.body.questionId,
            text: req.body.text,
            username: req.body.username,
        });
        const reached = await AddAnswertoQues(req.body.questionId, newAnswer._id);
        //save answer and respond
        const answer = await newAnswer.save();
        console.log(answer._id);
        await User.findByIdAndUpdate(req.body.userId , {
            $push: {"answers" : answer._id}
        })
        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.AddComment = async (req, res) => {
    try{
        const doc = await Answer.findByIdAndUpdate(req.params.id, {
            $push: {"comments": {
                username: req.body.username,
                text: req.body.comment,
            } }
        })
        res.status(200).send(doc);
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.UpvoteComment = async (req, res) => {
    try {
        const doc = await Answer.findById(req.params.id, async (err, answer) => {
            if (!err) {
                if (!answer) {
                    console.log(answer, "real sad")
                }
                else {
                    const comment = answer.comments.id(req.body.commentId)
                    comment.upvotes.push(req.body.username);
                    await answer.save();
                }
            }
            else console.log(err);
        })
        res.status(200).send(doc)
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

exports.getAllAnswer = async (req, res) => {
    try{
        const answers = await Answer.find({"question": req.query.id});
        res.status(200).json(answers);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.getUserAnswer = async (req,res) => {
    try{
        const answers = await Answer.find({"userId": req.body.userId});
        res.status(200).send(answers);
    }catch(err){
        res.status(500).send(err);
    }
}

exports.UpdateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndUpdate(req.params.id, {
            'body': req.body.text,
        });
        res.status(200).send(answer);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.VoteComAns = async (req, res) => {
    try {
        const doc = await Answer.findById(req.params.id);
        var answer;
        if (doc["comment"]) {
            // perform task 
            res.status(200).send("work in progress");
        }
        if (req.body.downvote) {
            if (doc["downvotes"].includes(req.body.userId)) {
                answer = await Answer.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        "downvotes": req.body.userId,
                    }
                });
            }
            else {
                answer = await Answer.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        "upvotes": req.body.userId,
                    },
                    $push: {
                        "downvotes": req.body.userId
                    }
                });
            }
        };
        if (req.body.upvote) {
            if (doc["upvotes"].includes(req.body.userId)) {
                answer = await Answer.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        "upvotes": req.body.userId,
                    }
                });
            }
            else {
                answer = await Answer.findByIdAndUpdate(req.params.id, {
                    $push: {
                        "upvotes": req.body.userId,
                    },
                    $pull: {
                        "downvotes": req.body.userId
                    }
                });
            }
        };
        res.status(200).send(answer);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.DeleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndDelete(req.params.id);
        res.status(200).send("successfully deleted if it ever existed!")
    } catch (e) {
        res.status(500).send(e)
    }
}

