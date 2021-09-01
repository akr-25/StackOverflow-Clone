import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AddComment from "./add_comment";
import Comment from "./comment";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Link } from "react-router-dom";

const Answer = (props) => {
  const { user } = useContext(AuthContext);

  async function updateVote(value) {
    if (value === 1) {
      await axios.put("/answer/udc/" + props.answerId, {
        upvote: true,
        downvote: false,
        comment: false,
        userId: user._id,
      });
    }
    if (value === -1) {
      await axios.put("/answer/udc/" + props.answerId, {
        upvote: false,
        downvote: true,
        comment: false,
        userId: user._id,
      });
    }
    window.location.reload(false);
  }
  //----------------------------------------------------------------------configure slate------------------------------------
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
  //--------------------------------------------------------------------------------------------------------------------------------------

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
        <div className='md:flex justify-between'>
          <div className='text-gray-400 flex text-md mt-4'>
            {/* <div className='mr-2'>Share</div> */}
            {/* <div className='mr-2'>Bookmark</div> */}
          </div>
          <div className='mr-2'>
            <span className='text-gray-400'>Answered by</span>
            <span> </span>
            <Link to={"/user/?username=" + props.username}>
              <span className='hover:text-blue-600 hover:underline'>
                {props.username}
              </span>
            </Link>
          </div>
        </div>
        <div className='mt-14'>
          {props.comments.map((val) => (
            <Comment
              key={uuidv4()}
              answerId={props.answerId}
              body={val.text}
              username={val.username}
              time={val.updatedAt}
              upvotes={val.upvotes}
              commentId={val._id}
              isQuestion={false}
            />
          ))}
          <AddComment isQuestion={false} _id={props.answerId} />
        </div>
      </div>
    </div>
  );
};

export default Answer;

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
