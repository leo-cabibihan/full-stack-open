const asObject = (anecdote) => {
  return {
    ...anecdote,
    votes: 0,
  };
};

const sortedObjects = (array, key) => {
  const newArray = array;
  newArray.sort((a, b) => b[key] - a[key]);
  return newArray;
};

const reducer = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case "VOTE":
      return sortedObjects(
        state.map((anecdote) =>
          action.data.id === anecdote.id
            ? Object.assign(anecdote, { votes: anecdote.votes + 1 })
            : anecdote
        ),
        "votes"
      );
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "UPDATE_ALL":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: asObject(content),
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const updateAll = (content) => {
  return {
    type: "UPDATE_ALL",
    data: content,
  };
};

export default reducer;
