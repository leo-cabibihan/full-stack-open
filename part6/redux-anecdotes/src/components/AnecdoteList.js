import React from "react";
import { vote } from "../reducers/anecdoteReducer";
//import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { showMessage } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  return (
    <>
      {props.anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(props.filter)
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  props.showMessage("vote added", 5000);
                  props.vote(anecdote);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  vote,
  showMessage,
};

const ConnectedAnecdotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotesList;

//export default AnecdoteList;
