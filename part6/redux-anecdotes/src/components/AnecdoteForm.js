import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { showMessage } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.showMessage(content, 5000);
    props.createAnecdote(content);
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

const mapDispatchToProps = {
  createAnecdote,
  showMessage,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default connectedAnecdoteForm;
