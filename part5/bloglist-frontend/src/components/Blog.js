import React from "react";
import Toggleable from "./Toggleable";
/*
author: "dsijisdj"
id: "5f5e245ca9f9629eb406c2f2"
likes: 0
title: "sddff"
url: "a.com"
user:
id: "5f5726834edba75c08f03a05"
name: "chicken"
username: "chicken"
*/

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
      <Toggleable buttonLabel={"show"} closingLabel={"hide"}>
        <div>{blog.url}</div>
        <div>{blog.likes} </div>
        <div>{blog.user.username}</div>
      </Toggleable>
    </div>
  );
};

export default Blog;
