//BlogForm.js
import React from "react";

const User = (props) => {
  console.log(props);
  return (
    <div>
      {props.blogs.length} {props.username}
    </div>
  );
};

export default User;
