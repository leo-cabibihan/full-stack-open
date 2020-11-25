import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

const CHANGE_AUTHORS = gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`;

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(CHANGE_AUTHORS, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const variables = { name: name.value, setBornTo: parseInt(born) };
    const res = await editAuthor({ variables });
    console.log(res);
    setName("");
    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        {authors.data.allAuthors && true ? (
          <Select
            defaultValue={name}
            onChange={setName}
            options={authors.data.allAuthors.map((author) => ({
              value: author.name,
              label: author.name,
            }))}
          />
        ) : null}
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">edit author birth</button>
      </form>
    </div>
  );
};

export default Authors;
