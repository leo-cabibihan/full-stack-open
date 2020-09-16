//over here
import React, { useState } from 'react'

const BlogForm = ({ action }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleInput = (event) => {
    event.preventDefault()
    action(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleInput}>
      <div>
        title{' '}
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div>
        author{' '}
        <input
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
          }}
        />
      </div>
      <div>
        url{' '}
        <input
          value={url}
          onChange={(event) => {
            setUrl(event.target.value)
          }}
        />
      </div>
      <div>
        <button type="submit"> Add </button>
      </div>
    </form>
  )
}

export default BlogForm
