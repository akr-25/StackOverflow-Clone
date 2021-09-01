const User = require("../models/User");
const Question = require("../models/Question");
const { QuesdeleteAnswer } = require("./answer_ques");

exports.PostQuestion = async (req, res) => {
    try {
        const user = await User.exists({ _id: req.body.userId });
        if (!user) throw ("User doesn't exist");
        console.log(req.body);
        const newQuestion = new Question({
            userId: req.body.userId,
            title: req.body.title,
            username: req.body.username,
            text: req.body.text,
            tags: req.body.tags,
        });

        console.log(newQuestion._id);
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { "questions": newQuestion._id }
        })
        const question = await newQuestion.save();
        res.status(200).json(question);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAllQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (e) {
        console.log(e);
    }
}

exports.getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (e) {
        console.log(e);
    }
}

exports.getUserQuestion = async (req, res) => {
    try {
        const user = await User.exists({_id: req.params.id}); 
        if (!user) throw ("User doesn't exist");
        const questions = await Question.find({ "userId": req.params.id});
        res.status(200).json(questions);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.AddComment = async (req, res) => {
    try {
        const doc = await Question.findByIdAndUpdate(req.params.id, {
            $push: {
                "comments": {
                    username: req.body.username,
                    text: req.body.comment,
                }
            },
        });
        res.status(200).json(doc);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.UpvoteComment = async (req, res) => {
    try {
        const doc = await Question.findById(req.params.id, async (err, question) => {
            if (!err) {
                if (!question) {
                    console.log(question, "real sad")//! FIX THIS
                }
                else {
                    const comment = question.comments.id(req.body.commentId)
                    comment.upvotes.push(req.body.username);
                    await question.save();
                }
            }
            else console.log(err); //! FIX THIS
        })
        res.status(200).send(doc)
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

exports.VoteComQues = async (req, res) => {
    try {
        const doc = await Question.findById(req.params.id);
        var question;
        if (doc["comment"]) {
            // perform task  //! FIX THIS
            res.status(200).send("work in progress");
        }
        if (req.body.downvote) {
            if (doc["downvotes"].includes(req.body.userId)) {
                question = await Question.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        "downvotes": req.body.userId,
                    }
                });
            }
            else {
                question = await Question.findByIdAndUpdate(req.params.id, {
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
                question = await Question.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        "upvotes": req.body.userId,
                    }
                });
            }
            else {
                question = await Question.findByIdAndUpdate(req.params.id, {
                    $push: {
                        "upvotes": req.body.userId,
                    },
                    $pull: {
                        "downvotes": req.body.userId
                    }
                });
            }
        };
        res.status(200).send(question);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.UpdateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, {
            "tag": req.body.tags,
            "text": req.body.text,
        })
        res.status(200).send(question)
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        await question.answers.forEach(async (answer) => {
            console.log(answer);
            await QuesdeleteAnswer(answer);
        })
        res.status(200).send("successfully deleted if it ever existed!")
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.SearchQuestion = async (req, res) => {
    try {
        const questions = await Question.aggregate([
            {
                $search: {
                    'index': 'ques',
                    'text': {
                        'query': req.body.query,
                        'path': {
                            'wildcard': '*'
                        }
                    }
                }
            }
        ])
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).send(err)
    }
};

exports.getTagQuestion = async (req, res) => {
    try {
        const questions = await Question.aggregate([
            {
                $search: {
                    'index': 'tag',
                    'text': {
                        'query': req.body.query,
                        'path': {
                            'wildcard': '*'
                        }
                    }
                }
            }
        ])
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getBunch = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const questions = user["bookmarks"];
        const result = await Promise.all(questions.map((async question => {
            return await Question.findById(question);
        })))
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send("Called")
    }
}