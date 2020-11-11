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
  console.log("update");
  const response = await axios.put(`${baseUrl}/${id}`, config(user.token));
  console.log(response);
  return response.data;
};

const remove = async (id) => {
  console.log(config(user.token, user.id));
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    config(user.token, user.id)
  );
  return response.data;
};

export default { getAll, create, like, remove, setUser };
