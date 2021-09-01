const { PostQuestion, getUserQuestion, getAllQuestion, deleteQuestion, AddComment, UpdateQuestion, VoteComQues, getQuestion, UpvoteComment, SearchQuestion, getTagQuestion, getBunch } = require("../controllers/question");
const router = require("express").Router()


//get a bunch of questions
router.put("/bookmarks", getBunch);

//get all question
router.get("/all", getAllQuestion);

//get all question using tag
router.put("/tag", getTagQuestion);

//search a question
router.put("/search", SearchQuestion);

//get all question of the user
router.get("/user/:id", getUserQuestion);

//post a question
router.put("/", PostQuestion);

//upvote downvote 
router.put("/udc/:id", VoteComQues)

//update a question
router.put("/:id", UpdateQuestion);

//add a comment to question
router.put("/comment/:id", AddComment);

//upvote a comment
router.put("/comment/up/:id", UpvoteComment);

//delete a questoin
router.delete("/:id", deleteQuestion);

//get question using id
router.get("/:id", getQuestion);

module.exports = router;
