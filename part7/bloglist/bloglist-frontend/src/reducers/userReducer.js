import loginService from "../services/login";
import { showMessage } from "./notificationReducer";
import store from "../store";

const reducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case "SIGN_IN":
      return action.data;
    case "SIGN_OUT":
      return {};
    default:
      return state;
  }
};

//replace set user with getState

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return { type: "SIGN_IN", data: user };
  }
  return {};
};

//  blogService.setUser(newUser);

export const signIn = (username, password) => {
  return async (dispatch) => {
    const newUser = await loginService
      .login(username, password)
      .catch((error) =>
        store.dispatch(showMessage("username or password is wrong", 2000))
      );
    window.localStorage.setItem("loggedBlogListUser", JSON.stringify(newUser));
    dispatch({ type: "SIGN_OUT", data: newUser });
  };
};

export const signOut = () => {
  window.localStorage.removeItem("loggedBlogListUser");
  return { type: "SIGN_OUT" };
};

console.log(reducer);

export default reducer;
