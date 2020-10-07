const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_FILTER":
      return action.data;
    default:
      return state;
  }
};

export const setTextFilter = (text) => {
  return {
    type: "NEW_FILTER",
    data: text,
  };
};

export default reducer;
