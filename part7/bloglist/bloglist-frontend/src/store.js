import notification from "./reducers/notificationReducer";
import blogs, { updateAll } from "./reducers/blogsReducer";
import user from "./reducers/signInReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import blogService from "./services/blogs";

const store = createStore(
  combineReducers({ notification, blogs, user }),
  composeWithDevTools(applyMiddleware(thunk))
);

blogService
  .getAll()
  .then((data) => {
    store.dispatch(updateAll(data));
  })
  .catch((err) => console.log(err));

export default store;
