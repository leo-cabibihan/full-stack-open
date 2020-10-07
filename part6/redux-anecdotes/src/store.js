import { composeWithDevTools } from "redux-devtools-extension";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({ anecdotes, notification, filter: filterReducer }),
  composeWithDevTools()
);
export default store;
