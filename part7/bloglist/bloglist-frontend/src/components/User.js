import React from "react";
//use redux
// useroutematch
// useparams
// get the id
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default User;
