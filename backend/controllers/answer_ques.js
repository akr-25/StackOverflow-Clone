const Answer = require("../models/Answer")
const Question = require("../models/Question")

exports.QuesdeleteAnswer = async (answerId) => {
    try {
        const answer = await Answer.findByIdAndDelete(answerId);
        return answer;
    } catch (err) {
        throw (err)
    }
}


module.exports.AddAnswertoQues = async (questionId, answerId) => {
    try {
        const exists = await Question.exists({ _id: questionId });
        if (!exists) throw ("question doesn't exist");
        const question = await Question.findByIdAndUpdate(questionId, {
            $push: { "answers": answerId },
        })
        return question;
    } catch (e) {
        throw (e);
    }
}