import anecdoteService from "../services/anecdotes";

const sortedVotes = (array) => {
  const newArray = array;
  newArray.sort((a, b) => b.votes - a.votes);
  return newArray;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return sortedVotes(
        state.map((anecdote) =>
          action.data.id === anecdote.id
            ? Object.assign(anecdote, { votes: anecdote.votes + 1 })
            : anecdote
        )
      );
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "UPDATE_ALL":
      return sortedVotes(action.data);
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(anecdote);
    dispatch({
      type: "VOTE",
      data: newAnecdote,
    });
  };
};

export const updateAll = (content) => {
  return {
    type: "UPDATE_ALL",
    data: content,
  };
};

export default reducer;
