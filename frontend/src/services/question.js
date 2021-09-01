import axios from 'axios';

export const PostQuestion = async (question) => {
    try {
        const res = await axios.put("/question", question);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const FetchAllQuestion = async () => {
    try {
        const res = await axios.get("/question/all");
        await res.data.forEach(async (question) => {
            const user = await axios.get("/users/?userId=" + question.userId);
            question["username"] = user.data["username"]
            console.log("hehe");
        })
        console.log("called");
        return res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
    } catch (err) {
        console.log(err);
    }
}