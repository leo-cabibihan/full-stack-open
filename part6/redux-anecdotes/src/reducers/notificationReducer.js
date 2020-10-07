const initialState = { content: "render here notification...", open: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return action.data;
    case "HIDE_MESSAGE":
      return { ...state, open: false };
    default:
      return state;
  }
};

export const showMessage = (message) => {
  return {
    type: "NEW_MESSAGE",
    data: { message, open: true },
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_MESSAGE",
  };
};

export default reducer;
