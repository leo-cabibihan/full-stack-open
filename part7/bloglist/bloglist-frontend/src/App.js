import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "./reducers/notificationReducer";
import { like, remove } from "./reducers/blogsReducer";
import {
  initializeUser,
  signIn as something,
  signOut as somethingElse,
} from "./reducers/signInReducer";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const App = () => {
  //const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const signIn = (username, password) => {
    dispatch(something(username, password));
  };

  const signOut = () => {
    dispatch(somethingElse());
  };
  const blogFormRef = useRef();
  /*
  const addBlog = (title, author, url) => {
    blogService
      .create({ title, author, url })
      .then((res) => {
        blogFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(res));
        dispatch(showMessage(`new blog, ${title} added`, 5000));
      })
      .catch(() => dispatch(showMessage("not formatted properly", 5000)));
  };
  */

  return (
    <div>
      <Notification />
      {isEmpty(user) ? (
        <LoginForm action={signIn} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {`Logged in as ${user.username}`}{" "}
            <button onClick={signOut}>Log Out</button>
          </p>
          <h2>add new</h2>
          <Toggleable buttonLabel={"add blog"} ref={blogFormRef}>
            {/*<BlogForm action={addBlog} />*/}
          </Toggleable>
          {blogs
            ? blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} like={like} remove={remove} />
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default App;
