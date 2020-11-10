import blogService from "../services/blogs";

const sorted = (list) => {
  return [...list].sort((b, a) => a.likes - b.likes);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE_BLOG":
      const newBlog = action.data.newBlog;
      return sorted(
        state.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      );
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    case "UPDATE_ALL":
      return action.data;
    default:
      return state;
  }
};

export const like = (id) => {
  return async (dispatch) => {
    const newBlog = await blogService(id);
    dispatch({ type: "LIKE_BLOG", data: { newBlog } });
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: "REMOVE_BLOG", data: { id } });
  };
};

export const updateAll = (data) => {
  console.log("hi");
  return {
    type: "UPDATE_ALL",
    data,
  };
};

export default reducer;
