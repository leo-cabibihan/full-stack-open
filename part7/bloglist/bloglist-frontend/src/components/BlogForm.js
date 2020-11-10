import React, { useState } from "react";

const BlogForm = ({ action }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    action(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleInput}>
      <div>
        title{" "}
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        author{" "}
        <input
          id="author"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
      </div>
      <div>
        url{" "}
        <input
          id="url"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
      </div>
      <div>
        <button id="add-note" type="submit">
          {" "}
          Add{" "}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
