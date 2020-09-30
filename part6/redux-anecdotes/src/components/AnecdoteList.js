import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const Anecdote = () => {
  const sorted = (array) => {
    let newArray = array;
    newArray.sort((a, b) => b - a);
    return newArray;
  };

  const anecdotes = useSelector((state) => sorted(state));
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdote;
