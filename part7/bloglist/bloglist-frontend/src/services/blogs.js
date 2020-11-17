import axios from "axios";

const baseUrl = "/api/blogs";

let user = {};

const setUser = (newUser) => {
  user = newUser;
};

const config = (token, userId) => {
  const headers = { Authorization: `bearer ${token}` };
  return !!userId ? { headers, data: { userId } } : { headers };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config(user.token));
  return response.data;
};

const like = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`, config(user.token));
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    config(user.token, user.id)
  );
  return response.data;
};

const addComment = async (comment, id) => {
  console.log(comment);
  await axios.post(`${baseUrl}/${id}/comments`, { comment });
};

export default { getAll, create, like, remove, setUser, addComment };
