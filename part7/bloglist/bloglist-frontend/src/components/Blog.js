import React from "react";
import Toggleable from "./Toggleable";
import { useDispatch } from "react-redux";

const Blog = ({ blog, like, remove }) => {
  const dispatch = useDispatch();
  const useRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(remove(blog.id));
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Toggleable id={"show-button"} buttonLabel={"show"} closingLabel={"hide"}>
        <div>{blog.url}</div>
        <div className="likes">
          {blog.likes}{" "}
          <button
            id="like-button"
            onClick={() => {
              dispatch(like(blog.id));
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        <button onClick={useRemove}> remove </button>
      </Toggleable>
    </div>
  );
};

export default Blog;
