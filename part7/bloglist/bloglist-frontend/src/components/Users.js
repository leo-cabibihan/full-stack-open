//BlogForm.js
import React, { useState, useEffect } from "react";
import userService from "../services/users";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAllUsers().then((users) => setUsers(users));
  }, []);
  return (
    <>
      <h2>users</h2>
      <p>blogs created</p>
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </>
  );
};

export default Users;
