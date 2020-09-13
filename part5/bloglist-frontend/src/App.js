//app.js
import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [shouldMessage, setShouldMessage] = useState(false);

  const showMessage = (words) => {
    setMessage(words);
    setShouldMessage(true);
    setTimeout(() => {
      setShouldMessage(false);
    }, 3000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
        blogService.setToken(newUser.token);
      })
      .catch((error) => {
        showMessage("username or password is wrong");
      });
  };

  const signOut = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };
  const blogFormRef = useRef();

  const addBlog = (title, author, url) => {
    blogService
      .create({ title, author, url })
      .then((res) => {
        blogFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(res));
        showMessage(`new blog, ${title} added`);
      })
      .catch((err) => showMessage("not formatted properly"));
  };

  return (
    <div>
      {shouldMessage ? <p>{`${message}`}</p> : null}
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
          <Toggleable buttonLabel={"new note"} ref={blogFormRef}>
            <BlogForm action={addBlog} />
          </Toggleable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
