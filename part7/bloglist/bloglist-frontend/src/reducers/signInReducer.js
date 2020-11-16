import loginService from "../services/login";
import blogService from "../services/blogs";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.data;
    case "SIGN_OUT":
      return {};
    default:
      return state;
  }
};

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setUser(user);
    return { type: "SIGN_IN", data: user };
  }
  return { type: "NOTHING" };
};

export const signIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setUser(user);
      dispatch({ type: "SIGN_IN", data: user });
    } catch {
      alert("wrong password");
      dispatch({ type: "NOTHING" });
    }
  };
};

export const signOut = () => {
  window.localStorage.removeItem("loggedBlogListUser");
  blogService.setUser({});
  return { type: "SIGN_OUT" };
};

console.log(reducer);

export default reducer;
