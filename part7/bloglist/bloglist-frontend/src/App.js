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

const sorted = (list) => {
  return [...list].sort((b, a) => a.likes - b.likes);
};

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //blogService.setToken(user.token);
      blogService.setUser(user);
    }
  }, []);

  const signIn = (username, password) => {
    loginService
      .login(username, password)
      .then((newUser) => {
        setUser(newUser);
        window.localStorage.setItem(
          "loggedBlogListUser",
          JSON.stringify(newUser)
        );
        //blogService.setToken(newUser.token);
        blogService.setUser(newUser);
      })
      .catch(() => {
        dispatch(showMessage("username or password is wrong", 5000));
      });
  };

  const signOut = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
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
      {user === null ? (
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
