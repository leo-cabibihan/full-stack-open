import { composeWithDevTools } from "redux-devtools-extension";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import anecdoteService from "./services/anecdotes";
import { updateAll } from "./reducers/anecdoteReducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ anecdotes, notification, filter: filterReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(updateAll(anecdotes)));

export default store;
