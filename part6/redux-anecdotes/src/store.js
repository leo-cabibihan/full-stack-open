import { composeWithDevTools } from "redux-devtools-extension";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({ anecdotes, notification }),
  composeWithDevTools()
);
export default store;
