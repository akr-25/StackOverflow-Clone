import axios from "axios";
import { useContext, useRef } from "react";
import {AuthContext} from "../context/authContext";

const AddComment = (props) => {
  const {user} = useContext(AuthContext);
  const commentRef = useRef();

  const clickHandler = async () => {
    if(commentRef.current.value.trim() === "")
    {
      console.log("Comment cannot be empty!")
      return;
    }
    let res;
    if(props.isQuestion)
    {
      res = await axios.put("/question/comment/" + props._id, {
        username: user.username,
        comment: commentRef.current.value
      })
    }
    else {
      res = await axios.put("/answer/comment/" + props._id, {
        username: user.username,
        comment: commentRef.current.value,
      });
    }
    document.location.reload(false);
    console.log(res);
  };

  return (
    <div className='flex text-sm border-t-2 py-2'>
      <div className='cursor-pointer hover:text-blue-300 text-gray-400' onClick={clickHandler}>
        Add a comment
      </div>
      <input
        type='text'
        className='outline-none focus:outline-none flex-1 ml-2'
        ref={commentRef}
      />
    </div>
  );
};

export default AddComment;
