import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const toFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(toFilter))
        .map((anecdote) => (
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

export default AnecdoteList;
