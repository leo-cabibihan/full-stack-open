import blogService from "../services/blogs";

const sorted = (list) => {
  return [...list].sort((b, a) => a.likes - b.likes);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE_BLOG":
      return sorted(
        state.map((blog) => {
          if (blog.id === action.data.id) {
            const { likes, ...rest } = blog;
            const newBlog = { likes: blog.likes + 1, ...rest };
            return newBlog;
          } else {
            return blog;
          }
        })
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
    await blogService.like(id);
    dispatch({ type: "LIKE_BLOG", data: { id } });
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({ type: "REMOVE_BLOG", data: { id } });
    } catch {
      alert("you can't delete what isn't yours");
    }
  };
};

export const updateAll = (data) => {
  return {
    type: "UPDATE_ALL",
    data,
  };
};

export default reducer;
