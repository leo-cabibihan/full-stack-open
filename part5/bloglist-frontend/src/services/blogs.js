import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const config = (token) => {
  return { headers: { Authorization: token } };
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config(token));
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config(token));
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config(token));
  return request.then((response) => console.log("success"));
};

export default { getAll, create, update, setToken, remove };