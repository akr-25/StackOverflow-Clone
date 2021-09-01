import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import { Link } from "react-router-dom";

const Comment = (props) => {
  var { user } = useContext(AuthContext);

  const clickHandler = async () => {
    var doc = "user already upvoted the comment";
    if (props.isQuestion) {
      if (!props.upvotes.includes(user.username)) {
        doc = await axios.put("/question/comment/up/" + props.questionId, {
          username: user.username,
          commentId: props.commentId,
        });
      }
      console.log(doc);
    }
    else{
      if (!props.upvotes.includes(user.username)) {
        doc = await axios.put("/answer/comment/up/" + props.answerId, {
          username: user.username,
          commentId: props.commentId,
        });
        document.location.reload(false);
      }
      console.log(doc);
    }
  };

  return (
    <div className='flex text-sm border-t-2 py-2'>
      <div className='mr-3 text-red-400 cursor-pointer ml-2' onClick={clickHandler}>
        {props.upvotes.length}
      </div>
      <div className=''>
        {props.body}
        <span>-</span>
        <Link to={"/user/?username=" + props.username}>
          <span className='text-blue-600 ml-1'>{props.username}</span>
        </Link>
        <span className='text-gray-400 ml-1'>
          {moment(props.time).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default Comment;
