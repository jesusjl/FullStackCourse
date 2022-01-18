import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleChange = (event) => {
    event.preventDefault()
    const target = event.target
    if (target.name === 'Title') {
      console.log(target.value)
      setTitle(target.value)
    } else if (target.name === 'Author') {
      console.log(target.value)
      setAuthor(target.value)
    } else if (target.name === 'Url') {
      console.log(target.value)
      setUrl(target.value)
    }
  }

  const addPost = (event) => {
    event.preventDefault()
    console.log(user)
    createBlog({
      'title': title,
      'author':author,
      'url': url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return(
    <div className='formDiv'>
      <form onSubmit={addPost}>
        Title
        <input id='title' type="text" name='Title' value={title}  onChange={handleChange}/><br/>
        Author
        <input id='author' type="text" name='Author' value={author}  onChange={handleChange} /><br/>
        Url
        <input id='url' type="url" name='Url' value={url}  onChange={handleChange} /><br/>
        <button id='submitButton' type="submit">Create post</button>
      </form>
    </div>
  )}

export default BlogForm