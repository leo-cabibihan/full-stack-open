const initialState = { message: "render here notification...", open: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      if (state.open === true) {
        clearTimeout(action.timeout);
      }
      return { ...state, open: true };
    case "HIDE_MESSAGE":
      return { ...state, open: false };
    default:
      return state;
  }
};

export const showMessage = (message, duration) => {
  return (dispatch) => {
    let timeout = setTimeout(function () {
      dispatch({ type: "HIDE_MESSAGE" });
    }, duration);
    dispatch({
      type: "NEW_MESSAGE",
      data: { message, open: true },
      timeout,
    });
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_MESSAGE",
  };
};

export default reducer;
