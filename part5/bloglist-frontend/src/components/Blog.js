import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog, like, remove }) => {
  const useRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
    }
  }
  return (
    <div>
      {blog.title} {blog.author}
      <Toggleable buttonLabel={'show'} closingLabel={'hide'}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}{' '}
          <button
            onClick={() => {
              like(blog.id)
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        <button onClick={useRemove}> remove </button>
      </Toggleable>
    </div>
  )
}

export default Blog
