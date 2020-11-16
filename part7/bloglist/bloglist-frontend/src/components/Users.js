//BlogForm.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUsers());
  }, []);
  return (
    <>
      <h2>users</h2>
      <p>blogs created</p>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.blogs.length} {user.username}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Users;
