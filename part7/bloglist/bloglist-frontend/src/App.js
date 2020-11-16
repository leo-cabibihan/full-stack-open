import React, { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeUser,
  signIn as something,
  signOut as somethingElse,
} from "./reducers/signInReducer";
import Users from "./components/Users";
import User from "./components/User";
import { Switch, Route } from "react-router-dom";

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

  useEffect(() => {
    dispatch(initializeUser());
  }, []); // eslint-disable-line

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
          <Switch>
            <Route exact path="/">
              <h2>blogs</h2>
              <p>
                {`Logged in as ${user.username}`}{" "}
                <button onClick={signOut}>Log Out</button>
              </p>
              <h2>add new</h2>
              <Toggleable buttonLabel={"add blog"} ref={blogFormRef}>
                {/*<BlogForm action={addBlog} />*/}
              </Toggleable>
              <Blogs />
              <Users />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
