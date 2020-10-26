import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (anecdote) => {
  console.log(anecdote);
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  console.log(newAnecdote);
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote);
  console.log(response);
  return response.data;
};

export default { getAll, createNew, vote };
