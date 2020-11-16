import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
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
