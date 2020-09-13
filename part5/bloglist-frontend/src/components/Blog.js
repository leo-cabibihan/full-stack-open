import React from "react";
import Toggleable from "./Toggleable";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
