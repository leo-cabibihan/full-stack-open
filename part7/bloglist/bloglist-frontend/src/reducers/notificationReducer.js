const initialState = { message: "nothing here yet", open: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      if (state.open === true) {
        clearTimeout(state.timeout);
      }
      return action.data;
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
      data: { message, open: true, timeout },
    });
  };
};

export default reducer;
