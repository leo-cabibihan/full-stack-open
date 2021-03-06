import React from "react";
import Toggleable from "./Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { like, remove } from "../reducers/blogsReducer";
import { useRouteMatch } from "react-router-dom";
import CommentForm from "./CommentForm";

const Blog = () => {
  const dispatch = useDispatch();
  const useRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(remove(blog.id));
    }
  };
  const blogs = useSelector((state) => state.blogs);
  const match = useRouteMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <div className="blog">
      {blog ? (
        <>
          {" "}
          {blog.title} {blog.author}
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
          comments
          <CommentForm id={blog.id} />
          <div>
            {blog.comments.map((comment) => (
              <li> {comment}</li>
            ))}
          </div>
          <button onClick={useRemove}> remove </button>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
