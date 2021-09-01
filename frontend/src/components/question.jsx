import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Comment from "./comment";
import AddComment from "./add_comment";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import { useRef } from "react";
// @refresh reset

const Question = (props) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const shareRef = useRef();

  // bookmark
  const bookmarkHandler = async () => {
    axios.put("/users/bookmark", {
      userId: user._id,
      questionId: props.questionId,
    });
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (!_.isArray(bookmarks)) {
      bookmarks = _.castArray(bookmarks);
      console.log("Called");
    }
    if (!bookmarks.includes(props.questionId)) {
      bookmarks.push(props.questionId);
      console.log(bookmarks, "push");
    } else {
      _.pull(bookmarks, props.questionId);
      console.log(bookmarks, "pull");
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    history.go(0);
  };

  // upvote feature
  async function updateVote(value) {
    if (value === 1) {
      await axios.put("/question/udc/" + props.questionId, {
        upvote: true,
        downvote: false,
        comment: false,
        userId: user._id,
      });
    }
    if (value === -1) {
      await axios.put("/question/udc/" + props.questionId, {
        upvote: false,
        downvote: true,
        comment: false,
        userId: user._id,
      });
    }
    history.go(0);
  }

  // configure slate
  const editor = useMemo(() => withReact(createEditor()), []);
  var [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "loading....." }],
    },
  ]);
  useEffect(() => {
    if (props.text != "") setEditorValue(JSON.parse(props.text));
  }, [props.text]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "paragraph":
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className='flex'>
      <div className=''>
        <div className='flex flex-col items-center'>
          <button
            onClick={() => {
              updateVote(1);
            }}
          >
            <i
              className={
                props.upvotes.includes(props.userId)
                  ? "bi bi-caret-up-fill text-gray-600 text-5xl"
                  : "bi bi-caret-up-fill text-gray-300 text-5xl"
              }
            ></i>
          </button>
          <span className='text-gray-600'>
            {props.upvotes.length - props.downvotes.length}
          </span>
          <button
            onClick={() => {
              updateVote(-1);
            }}
          >
            <i
              className={
                props.downvotes.includes(props.userId)
                  ? "bi bi-caret-down-fill text-gray-600 text-5xl"
                  : "bi bi-caret-down-fill text-gray-300 text-5xl"
              }
            ></i>
          </button>
        </div>
      </div>
      <div className='mt-4 ml-3 w-full'>
        {/* <div>{props.text}</div> */}
        <Slate editor={editor} value={editorValue}>
          <Editable className='p-3' renderElement={renderElement} />
        </Slate>
        <div className='flex mt-4'>
          {props.tags != null &&
            props.tags.map((tag) => {
              return (
                <div
                  key={uuidv4()}
                  className='text-blue-500 bg-blue-100 rounded py-1 px-2 text-sm mr-2'
                >
                  {tag}
                </div>
              );
            })}
        </div>
        <div className='md:flex justify-between'>
          <div className='text-gray-400 flex text-md mt-4'>
            <div className='tooltip'>
              <button
                className='mr-2'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  shareRef.current.innerHTML = "Copied!";
                }}
                onMouseOut={() => shareRef.current.innerHTML = "Copy link to Clipboard"}
              >
                <span className='tooltiptext' ref={shareRef}>
                  Copy link to Clipboard
                </span>
                Share
              </button>
            </div>
            <button className='mr-2' onClick={bookmarkHandler}>
              {localStorage.getItem("bookmarks").includes(props.questionId)
                ? "Bookmarked"
                : "Bookmark"}
            </button>
          </div>
          <div className='mr-2'>
            <span className='text-gray-400'>Asked by</span>
            <span> </span>
            <Link to={"/user/?username=" + props.username}>
              <span className='hover:text-blue-600 hover:underline'>
                {props.username}
              </span>
            </Link>
          </div>
        </div>
        <div className='mt-4'>
          {props.comments.map((val) => (
            <Comment
              key={uuidv4()}
              questionId={props.questionId}
              body={val.text}
              username={val.username}
              time={val.updatedAt}
              upvotes={val.upvotes}
              commentId={val._id}
              isQuestion={true}
            />
          ))}
        </div>
        <AddComment isQuestion={true} _id={props.questionId} />
      </div>
    </div>
  );
};

export default Question;

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

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
