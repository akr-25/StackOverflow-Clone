import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SideBar from "../components/side_bar";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import HomePageQuestion from "./AllQuestion/question";

const INITIAL_DATA = {
  answers: [],
  questions: [],
  email: [],
  username: "",
  _id: "",
};

const UsersDisplay = () => {
  const [currentUser, setCurrentUser] = useState(INITIAL_DATA);
  let query = new URLSearchParams(useLocation().search);
  const [questions, setQuestions] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchQuestion = async () => {
      if (currentUser._id !== "") {
        var res = await axios.get("/question/user/" + currentUser._id);
        res = res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
        console.log("question", res);
        setQuestions([...res]);
      }
    };
    fetchQuestion();
  }, [currentUser]);

  useEffect(() => {
    const fetchBookmarked = async () => {
      if (currentUser._id !== "") {
        var res = await axios.put("/question/bookmarks", {
          userId: currentUser._id,
        });
        setBookmarkedQuestions(res.data);
      }
    };
    fetchBookmarked();
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const username = query.get("username");
      const userId = query.get("userId");
      var res;
      if (
        (userId === null || userId === "") &&
        (username === null || username === "")
      ) {
        await history.push("users");
      }
      if (userId !== null) res = await axios.get("/users/?userId=" + userId);
      else if (username !== null)
        res = await axios.get("/users/?username=" + username);
      res = res.data;
      setCurrentUser(res);
    };
    fetchUser();
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex justify-center min-h-screen relative'>
        <section
          className='grid lg:max-w-screen-xl w-full grid-cols-12 '
          style={{ fontFamily: '"Roboto Mono", monospace' }}
        >
          <div className='col-span-2 border-r text-gray-500 text-sm relative w-full hidden md:block'>
            <SideBar page={"users"} />
          </div>
          <div className='col-span-12 md:col-span-10  font-sans  mx-5'>
            <div className='flex items-center mt-6 bg-opacity-40 bg-pink-200 rounded p-4'>
              <button onClick={() => {}}>
                <img
                  className='p-2 rounded-full hidden md:flex'
                  src={
                    currentUser.profilePicture ??
                    "https://www.nicepng.com/png/full/136-1366211_gray-circle-png.png"
                  }
                  width='164'
                  alt='profilePicture'
                />
              </button>
              <div className='flex flex-col items-start justify-start pb-2 ml-4'>
                <div className='text-3xl'>
                  {currentUser.username ?? "loading.."}
                </div>
                <div className='text-gray-500'>
                  Member since:{" "}
                  {moment(currentUser.createdAt).fromNow().replace("ago", "")}
                </div>
                <div className='text-gray-500'>
                  Total question asked: {currentUser.questions.length}
                </div>
                <div className='text-gray-500'>
                  Total answers : {currentUser.answers.length}
                </div>
              </div>
            </div>
            <div className='text-2xl mt-2 py-2 text-gray-700 '>
              Questions asked by {currentUser.username}
            </div>
            <div className='mt-5 border-t-2 flex-wrap overflow-auto max-h-96'>
              {questions.map((question) => {
                return (
                  <HomePageQuestion
                    key={uuidv4()}
                    title={question.title}
                    upvotes={question.upvotes.length}
                    answers={question.answers.length}
                    tags={question.tags}
                    id={question._id}
                    username={currentUser.username}
                  />
                );
              })}
              {questions.length !== 0 ? null : (
                <div className='flex justify-center items-center text-xl bg-gray-100 p-2'>
                  No questions asked
                </div>
              )}
              {/* end of question tree */}
            </div>
            <div className='text-2xl mt-8 py-2 text-gray-700 '>
              Questions bookmarked by {currentUser.username}
            </div>
            <div className='mt-5 border-t-2 flex-wrap overflow-auto max-h-96 mb-36'>
              {bookmarkedQuestions.map((question) => {
                return (
                  <HomePageQuestion
                    key={uuidv4()}
                    title={question.title}
                    upvotes={question.upvotes.length}
                    answers={question.answers.length}
                    tags={question.tags}
                    id={question._id}
                    username={currentUser.username}
                  />
                );
              })}
              {bookmarkedQuestions.length !== 0 ? null : (
                <div className='flex justify-center items-center text-xl bg-gray-100 p-2'>
                  No questions bookmarked
                </div>
              )}
              {/* end of question tree */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UsersDisplay;
