const initialState = "render here notification...";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export const showMessage = (message) => {
  return {
    type: "NEW_MESSAGE",
    data: message,
  };
};

export default reducer;
