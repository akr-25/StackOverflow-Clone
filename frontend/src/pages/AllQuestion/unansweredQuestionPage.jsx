import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SideBar from "../../components/side_bar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePageQuestion from "./question";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UnansweredQuestionPage = () => {
  const [questions, setQuestions] = useState([]);

  let query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("query");

  useEffect(() => {
    const fetchQuestion = async () => {
      var res;
      if (searchQuery === null) {
        res = await axios.get("/question/all");
      } else {
        res = await axios.put("/question/search", {
          query: searchQuery,
        });
      }
      res = res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setQuestions([...res]);
      await Promise.all(
        res.map(async (question) => {
          const user = await axios.get("/users/?userId=" + question.userId);
          question["username"] = user.data["username"];
          setQuestions([...res]);
        })
      );
    };
    fetchQuestion();
  }, [searchQuery]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex justify-center min-h-screen relative'>
        <section
          className='grid lg:max-w-screen-xl w-full grid-cols-12 '
          style={{ fontFamily: '"Roboto Mono", monospace' }}
        >
          <div className='col-span-2 border-r text-gray-500 text-sm relative w-full hidden md:block'>
            <SideBar page={"question"} />
          </div>
          <div className='col-span-12 md:col-span-10  font-sans  mx-5'>
            {/* -------------------------------------------- TITLE - ---------------------------- */}
            <div className={"md:flex justify-between mt-6 border-b-2 pb-2"}>
              <div className='text-3xl mb-10'>Unanswered Questions</div>
              <div>
                <Link to='/ask'>
                  <button className='flex items-center rounded-md text-white btn-log px-3 py-2 border hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'>
                    <i className='bi bi-question-square mr-2' />
                    <span>Ask a Question</span>
                  </button>
                </Link>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------------------- */}
            <div className=''>
              {questions.map((question) => {
                if (question.answers.length === 0)
                  return (
                    <HomePageQuestion
                      key={uuidv4()}
                      title={question.title}
                      upvotes={question.upvotes.length}
                      answers={question.answers.length}
                      tags={question.tags}
                      id={question._id}
                      username={question.username}
                    />
                  );
              })}
              {questions.length === 0 ? (
                <div className='flex items-center justify-center mt-16 text-lg'>
                  <div className='bg-gray-100 p-4 rounded text-center w-1/2 shadow'>
                    It looks like there aren't any matches for your search.{" "}
                    <br></br> <br />
                    <strong>Tip</strong> Try using words that might appear on
                    the page that you’re looking for. For example, 'cake
                    recipes' instead of 'how to make a cake'.
                  </div>
                </div>
              ) : null}
              {/* end of question tree */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UnansweredQuestionPage;
