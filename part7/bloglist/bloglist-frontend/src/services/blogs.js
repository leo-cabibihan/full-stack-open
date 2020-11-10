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

const update = (id) => {
  const request = axios.put(`${baseUrl}/${id}`, config(user.token));
  return request.then((response) => response.data);
};

const remove = (id) => {
  console.log(config(user.token, user.id));
  const request = axios.delete(`${baseUrl}/${id}`, config(user.token, user.id));
  return request.then((response) => console.log("success"));
};

export default { getAll, create, update, remove, setUser };
