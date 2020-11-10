import notification from "./reducers/notificationReducer";
import blogs, { updateAll } from "./reducers/blogsReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import blogService from "./services/blogs";

const store = createStore(
  combineReducers({ notification, blogs }),
  composeWithDevTools(applyMiddleware(thunk))
);

blogService
  .getAll()
  .then((data) => {
    store.dispatch(updateAll(data));
  })
  .catch((err) => console.log(err));

export default store;
