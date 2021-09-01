const { PostAnswer, DeleteAnswer, UpdateAnswer, getAllAnswer, getUserAnswer, VoteComAns, AddComment, UpvoteComment } = require("../controllers/answer");
const router = require("express").Router()

//get all answer of a question
router.get("/ques", getAllAnswer);

//get all question of the user
router.get("/:id", getUserAnswer);

//upvote downvote comment
router.put("/udc/:id", VoteComAns)

//post a answer
router.put("/", PostAnswer);

//upvote a comment
router.put("/comment/up/:id", UpvoteComment)

//add a comment
router.put("/comment/:id", AddComment)

//update a answer
router.put("/:id", UpdateAnswer);

//delete a answer
router.delete("/:id", DeleteAnswer)

module.exports = router;
