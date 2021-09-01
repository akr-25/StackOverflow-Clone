import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  useContext,
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { PostQuestion } from "../services/question";
import { AuthContext } from "../context/authContext";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
// @refresh reset

const AskPage = () => {
  const { user } = useContext(AuthContext);
  const title = useRef();
  const tag = useRef();

  //----------------------------------------------------------------------configure slate------------------------------------
  const editor = useMemo(() => withReact(createEditor()), []);
  const [editorValue, setEditorValue] = useState(
    JSON.parse(localStorage.getItem("content")) || 
    [
      {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
      },
    ],
  );
  // const string = '[{"type":"paragraph","children":[{"text":"A line of text in a paragraph."}]}]';
  // console.log(JSON.parse(localStorage.getItem("content")));
  // console.log(JSON.parse(string))

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
  //-----------------------------------------------------------------------------------------------------------------------------------------

  const questionSubmit = async (e) => {
    e.preventDefault();
    let tags = tag.current.value.split(",");
    tags = tags.map((tag) => tag.trim());
    if (tags[0] === "") tags = null;
    const question = {
      userId: user._id,
      username: user.username,
      title: title.current.value,
      text: JSON.stringify(editorValue),
      // text: editorValue,
      tags: tags,
    };
    const res = await PostQuestion(question);
    if (res.status === 200) {
      localStorage.removeItem('content');
      handler(res.data._id);
    } else {
      alert(res.status);
    }
  };
  const history = useHistory();
  const handler = (id) => {
    //Redirect to another route
    history.push("/question/" + id);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex justify-center min-h-screen bg-gray-100 m-2 md:m-0'>
        <section className='lg:max-w-screen-xl w-full '>
          <div
            className='text-3xl my-12'
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            Ask a public question
          </div>
          <form type='submit'>
            <div className='bg-white rounded shadow-md md:w-3/4 h-2/3 flex flex-col p-6'>
              <p className='font-semibold'>Title</p>
              <p className='text-sm mb-1'>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                className='border-2 focus:outline-none focus:ring focus:border-blue-100 text-sm rounded px-6 w-full py-2'
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                type='text'
                ref={title}
              />
              <p className='font-semibold mt-3'>Body</p>
              <p className='text-sm mb-1'>
                Include all the information someone would need to answer your
                question
              </p>
              {/* <textarea
                className='w-full border-2 p-2 focus:outline-none rounded focus:ring focus:border-blue-100'
                rows='10'
                placeholder='e.g. how to center a div in css?'
                ref={body}
              /> */}
              <div className='border-2 focus:outline-none focus:ring focus:border-blue-100 rounded'>
                <Slate
                  editor={editor}
                  value={editorValue}
                  onChange={(editorValue) => {
                    setEditorValue(editorValue);
                    const content = JSON.stringify(editorValue);
                    localStorage.setItem("content", content);
                  }}
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
              <label htmlFor='tags' className='font-semibold mt-3'>
                Tags
              </label>
              <p className='text-sm mb-1'>
                Add up to 5 tags to describe what your question is about, each
                tag should be seperated by a comma
              </p>
              <input
                className='border-2 focus:outline-none focus:ring focus:border-blue-100 text-sm rounded px-6 w-full py-2'
                placeholder='e.g. flutter, js, node '
                type='text'
                ref={tag}
              />
            </div>
            {/* <Link to='/'> */}
            <button
              type='submit'
              onClick={questionSubmit}
              className='flex items-center rounded-md text-white btn-log px-3 py-2 border my-6 hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'
            >
              {/* <i className='bi bi-person mr-2' /> */}
              <span>Submit</span>
            </button>
            {/* </Link> */}
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AskPage;

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
