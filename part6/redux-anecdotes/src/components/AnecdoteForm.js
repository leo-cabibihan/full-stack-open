import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { hideNotification, showMessage } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(showMessage(content));
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
