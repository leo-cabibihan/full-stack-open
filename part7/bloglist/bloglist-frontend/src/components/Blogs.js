import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <div>{blog.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
