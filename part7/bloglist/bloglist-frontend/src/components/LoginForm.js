//BlogForm.js
import React, { useState } from "react";

const LoginForm = ({ action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    action(username, password);
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleInput}>
      <div>
        Username{" "}
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div>
        Password{" "}
        <input
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
        />
      </div>
      <div>
        <button id="login-button" type="submit">
          {" "}
          Add{" "}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
