import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogsReducer";

const BlogForm = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleInput = (event) => {
    event.preventDefault();
    console.log(comment);
    dispatch(addComment(comment, id));
    setComment("");
  };

  return (
    <form onSubmit={handleInput}>
      <div>
        comment{" "}
        <input
          id="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </div>
      <div>
        <button> Add Comment </button>
      </div>
    </form>
  );
};

export default BlogForm;
