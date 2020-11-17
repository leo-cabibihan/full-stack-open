import userService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USERS":
      console.log(action.data);
      return action.data;
    default:
      return state;
  }
};

export const updateUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    dispatch({ type: "ADD_USERS", data: users });
  };
};

export default reducer;
