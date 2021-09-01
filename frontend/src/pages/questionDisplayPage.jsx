import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HomeTitle from "../components/home_title";
import Question from "../components/question";
import Answer from "../components/answer";
import SideBar from "../components/side_bar";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  useContext,
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { AuthContext } from "../context/authContext";
import moment from "moment";
// @refresh reset

const INITIAL_DATA = {
  tags: [],
  answers: [],
  comments: [],
  downvotes: [],
  text: "",
  title: "Loading ...",
  upvotes: [],
  userId: "",
  username: "",
  _id: "",
};

// const INITIAL_DATA_ANSWER = {
//   [comments: [],
//   text: "Loading ...",
//   upvotes: [],
//   downvotes: [],
//   _id: "",
//   userId: "",
//   question: "",
//   username: "loading...",],
// }

const QuestionDisplay = () => {
  //------------------------------------------------------Loading question data-------------------------------------------------

  let { qid } = useParams();
  const [question, setQuestion] = useState(INITIAL_DATA);

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get("/question/" + qid);
      setQuestion(res.data);
    };
    fetchQuestion();
  }, [qid]);
  // -----------------------------------------------------loading answer data------------------------------------------------------
  const [answers, setAnswers] = useState([]);
  const [activeSort, setActiveSort] = useState(
    // localStorage.getItem("activeSort") ||
    "oldest"
  );
  const sorter = (mode) => {
    switch (mode) {
      case "oldest": {
        setAnswers(
          answers.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        break;
      }
      case "latest": {
        setAnswers(
          answers.sort((p2, p1) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        break;
      }

      case "votes": {
        setAnswers(
          answers.sort((p1, p2) => {
            return (
              p2.upvotes.length -
              p2.downvotes.length -
              (p1.upvotes.length - p1.downvotes.length)
            );
          })
        );
        break;
      }
      default:
        setAnswers(
          answers.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        break;
    }
  };
  useEffect(() => {
    const fetchAnswers = async () => {
      var res = await axios.get("/answer/ques?id=" + qid);
      res = res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setAnswers(res);
    };
    fetchAnswers();
  }, []);
  // ------------------------------------Posting answer ------------------------------------------------------------
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const answerSubmit = async (event) => {
    event.preventDefault();
    const answer = {
      userId: user._id,
      username: user.username,
      text: JSON.stringify(editorValue),
      questionId: qid,
    };
    const res = await axios.put("/answer", answer);
    if (res.status === 200) {
      history.go(0);
    } else {
      alert(res.status);
    }
  };
  //----------------------------------------------------------------------configure slate------------------------------------
  const editor = useMemo(() => withReact(createEditor()), []);
  const [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "paragraph":
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  //--------------------------------------------------------------------------------------------------------------------------------------

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
          <div className='col-span-12 md:col-span-10 font-sans  mx-5'>
            <HomeTitle
              questionTitle={question.title}
              age={moment(question.createdAt).fromNow()}
            />
            <Question
              questionId={qid}
              text={question.text}
              username={question.username}
              tags={question.tags}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              userId={user._id}
              comments={question.comments}
            />
            {/* answer part now */}
            <div className='md:flex justify-between mt-4'>
              <div className='text-2xl'>{question.answers.length} Answers</div>
              <div className='flex justify-around md:justify-start border rounded border-gray-600'>
                <button
                  className={
                    activeSort === "oldest"
                      ? "bg-gray-200 p-2 border-r border-gray-600 flex-1"
                      : "p-2 border-r border-gray-600 "
                  }
                  onClick={() => {
                    setActiveSort("oldest");
                    // localStorage.setItem("activeSort", "oldest");
                    sorter("oldest");
                  }}
                >
                  Oldest
                </button>
                <button
                  className={
                    activeSort === "latest"
                      ? "bg-gray-200 p-2 border-r border-gray-600 flex-1"
                      : "p-2 border-r border-gray-600 "
                  }
                  onClick={() => {
                    setActiveSort("latest");
                    // localStorage.setItem("activeSort", "latest");
                    sorter("latest");
                  }}
                >
                  Latest
                </button>
                <button
                  className={
                    activeSort === "votes" ? "bg-gray-200 p-2 flex-1" : "p-2"
                  }
                  onClick={() => {
                    setActiveSort("votes");
                    // localStorage.setItem("activeSort", "votes");
                    sorter("votes");
                  }}
                >
                  Votes
                </button>
              </div>
            </div>
            {answers.map((answer) => {
              return (
                <div key={uuidv4()}>
                  <Answer
                    answerId={answer._id}
                    text={answer.text}
                    userId={user._id}
                    username={answer.username}
                    upvotes={answer.upvotes}
                    downvotes={answer.downvotes}
                    comments={answer.comments}
                  />
                </div>
              );
            })}
            <div className='p-2 mt-2'>
              <div className='border-t-2  py-4 text-2xl'>Your Answer</div>
              <div className='border-2 rounded'>
                <Slate
                  editor={editor}
                  value={editorValue}
                  onChange={(editorValue) => setEditorValue(editorValue)}
                >
                  <div className='flex border p-1 space-x-3 bg-gray-50'>
                    <button
                      className='px-2 hover:bg-gray-300 rounded'
                      onClick={(e) => {
                        e.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                      }}
                    >
                      B
                    </button>
                    <button
                      className='px-2 hover:bg-gray-300 rounded'
                      onClick={(e) => {
                        e.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                      Code
                    </button>
                  </div>
                  <Editable
                    className='p-3'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                      // event.preventDefault();
                      if (!event.ctrlKey) {
                        return;
                      }
                      // Replace the `onKeyDown` logic with our new commands.
                      switch (event.key) {
                        case "`": {
                          event.preventDefault();
                          CustomEditor.toggleCodeBlock(editor);
                          break;
                        }
                        case "b": {
                          event.preventDefault();
                          CustomEditor.toggleBoldMark(editor);
                          break;
                        }
                        default: {
                        }
                      }
                    }}
                  />
                </Slate>
              </div>
              <button
                onClick={answerSubmit}
                className='flex items-center rounded-md text-white btn-log px-3 py-2 border my-6 hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'
              >
                <span>Post your Answer</span>
              </button>
            </div>

            <div className='m-3 text-lg text-center mt-8'>
              Not the answer you're looking for?
              <Link to='/ask'>
                <span className='text-blue-400'>Ask your own question.</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionDisplay;

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes} className='bg-gray-900 text-white px-2'>
      <code>{props.children}</code>
    </pre>
  );
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
